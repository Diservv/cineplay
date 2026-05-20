"use client";

import { useEffect, useState } from "react";
import { useEmbedProtection } from "@/hooks/useEmbedProtection";
import { embedProviders } from "@/utils/embedProviders";
import type { EmbedProvider } from "@/types";

interface EmbedPlayerProps {
  tmdbId: string | number;
  type: "movie" | "tv";
  season?: number;
  episode?: number;
  provider?: EmbedProvider;
}

export default function EmbedPlayer({
  tmdbId,
  type,
  season = 1,
  episode = 1,
  provider = embedProviders[0],
}: EmbedPlayerProps) {
  const [src, setSrc] = useState("");

  useEmbedProtection();

  useEffect(() => {
    const url =
      type === "movie"
        ? provider.movieUrl(tmdbId)
        : provider.tvUrl(tmdbId, season, episode);

    setSrc(url);
  }, [tmdbId, type, season, episode, provider]);

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
      <iframe
        src={src}
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allowFullScreen
        referrerPolicy="no-referrer"
        title="Video Player"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
