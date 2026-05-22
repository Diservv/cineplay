"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import {
  ForgotPasswordFormInput,
  ForgotPasswordFormSchema,
  LoginFormInput,
  LoginFormSchema,
  RegisterFormInput,
  RegisterFormSchema,
  ResetPasswordFormInput,
  ResetPasswordFormSchema,
} from "@/schemas/auth";
import { z } from "zod";
import { env } from "@/utils/env";
import { ActionResponse } from "@/types";

const isCaptchaEnabled = Boolean(env.NEXT_PUBLIC_CAPTCHA_SITE_KEY);

/**
 * A generic type for our authentication actions.
 * @template T The type of the form data.
 * @param data The validated form data.
 * @param supabase The Supabase client instance.
 * @returns An object with success status and message.
 */
type AuthAction<T> = (data: T, supabase: SupabaseClient) => Promise<{
  success: boolean;
  message: string;
}>;

/**
 * A higher-order function to create a server action that handles
 * form validation, captcha checks, and Supabase client creation.
 * @template T The type of the form data, which must include an optional captchaToken.
 * @param schema The Zod schema for validation.
 * @param action The core logic of the server action.
 * @returns An async function that serves as the server action.
 */
const createAuthAction = <T extends { captchaToken?: string }>(
  schema: z.ZodSchema<T>,
  action: AuthAction<T>,
  admin?: boolean,
) => {
  return async (formData: T): ActionResponse => {
    console.log("createAuthAction called with data:", formData);
    
    const result = schema.safeParse(formData);
    console.log("Schema parse result:", result);
    
    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join(". ");
      console.error("Validation failed:", message);
      return { success: false, message };
    }

    if (isCaptchaEnabled && !result.data.captchaToken) {
      console.error("Captcha is required but not provided");
      return { success: false, message: "Captcha is required." };
    }

    try {
      console.log("Creating Supabase client...");
      const supabase = await createClient(admin);
      console.log("Supabase client created, calling action...");
      const actionResult = await action(result.data, supabase);
      console.log("Action completed with result:", actionResult);
      return actionResult;
    } catch (error) {
      // Catch potential unhandled errors in actions
      console.error("Error in createAuthAction:", error);
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
      return { success: false, message: "An unexpected error occurred." };
    }
  };
};

const signInWithEmailAction: AuthAction<LoginFormInput> = async (data, supabase) => {
  try {
    const signInPayload = {
      email: data.email,
      password: data.loginPassword,
      ...(data.captchaToken ? { options: { captchaToken: data.captchaToken } } : {}),
    };

    const { data: authData, error } = await supabase.auth.signInWithPassword(signInPayload);

    if (error) {
      console.error("Sign in error:", error);
      return { success: false, message: error.message };
    }

    if (!authData || !authData.user) {
      console.error("No user data returned from sign in");
      return { success: false, message: "Authentication failed. No user data returned." };
    }

    const userId = authData.user.id;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return {
        success: false,
        message: "Could not fetch user profile.",
      };
    }

    if (!profile) {
      console.error("No profile found for user:", userId);
      return {
        success: false,
        message: "User profile not found. Please contact support.",
      };
    }

    return { success: true, message: `Welcome back, ${profile.username}` };
  } catch (err) {
    console.error("Unexpected error in signIn:", err);
    return { success: false, message: "An unexpected error occurred during sign in." };
  }
};

const signUpAction: AuthAction<RegisterFormInput> = async (data, supabase) => {
  try {
    // Check username availability
    const { data: usernameExists, error: usernameError } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", data.username)
      .maybeSingle();

    if (usernameError) {
      console.error("Username check error:", usernameError);
      return { success: false, message: "Database error. Could not check username availability." };
    }

    if (usernameExists) {
      return { success: false, message: "Username already taken." };
    }

    // Create user
    const signUpPayload = {
      email: data.email,
      password: data.password,
      ...(data.captchaToken ? { options: { captchaToken: data.captchaToken } } : {}),
    };

    const { data: authData, error: signUpError } = await supabase.auth.signUp(signUpPayload);

    if (signUpError) {
      console.error("Sign up error:", signUpError);
      return { success: false, message: signUpError.message };
    }

    if (!authData || !authData.user) {
      console.error("No user data returned from sign up");
      return { success: false, message: "User not created. Please try again." };
    }

    const userId = authData.user.id;

    // Insert profile
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: userId, username: data.username });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      return { 
        success: false, 
        message: "Could not create user profile. Please contact support." 
      };
    }

    return {
      success: true,
      message:
        "Sign up successful. Please check your email for verification. Check spam folder if you don't see it.",
    };
  } catch (err) {
    console.error("Unexpected error in signUp:", err);
    return { 
      success: false, 
      message: "An unexpected error occurred during sign up." 
    };
  }
};

const sendResetPasswordEmailAction: AuthAction<ForgotPasswordFormInput> = async (
  data,
  supabase,
) => {
  const { error } = await supabase.auth.resetPasswordForEmail(
    data.email,
    data.captchaToken ? { captchaToken: data.captchaToken } : undefined,
  );

  if (error) return { success: false, message: error.message };

  return {
    success: true,
    message: `We have sent an email to ${data.email}. Check spam folder if you don't see it.`,
  };
};

const resetPasswordAction: AuthAction<ResetPasswordFormInput> = async (data, supabase) => {
  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error) return { success: false, message: error.message };

  return { success: true, message: "Password has been reset successfully." };
};

export const signIn = createAuthAction(LoginFormSchema, signInWithEmailAction);
export const signUp = createAuthAction(RegisterFormSchema, signUpAction, true);
export const sendResetPasswordEmail = createAuthAction(
  ForgotPasswordFormSchema,
  sendResetPasswordEmailAction,
);
export const resetPassword = createAuthAction(ResetPasswordFormSchema, resetPasswordAction);

export const signOut = async (): ActionResponse => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) return { success: false, message: error.message };

  return { success: true, message: "You have been signed out." };
};
