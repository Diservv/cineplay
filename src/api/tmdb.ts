import { env } from "@/utils/env";
import { isEmpty } from "@/utils/helpers";
import { TMDB } from "tmdb-ts";

const token = env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

if (isEmpty(token)) {
  throw new Error("TMDB_ACCESS_TOKEN is not defined");
}

// Injeta language=pt-BR em todas as requisições ao TMDB automaticamente
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
      ? input.href
      : input.url;

  if (url.includes("api.themoviedb.org")) {
    const urlObj = new URL(url);
     urlObj.searchParams.set("language", "pt-BR");
     urlObj.searchParams.set("region", "BR");
    const newInput =
      typeof input === "string"
        ? urlObj.toString()
        : input instanceof URL
        ? urlObj
        : new Request(urlObj.toString(), input);
    return originalFetch(newInput, init);
  }

  return originalFetch(input, init);
};

export const tmdb = new TMDB(token);