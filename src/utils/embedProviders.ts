import type { EmbedProvider } from "@/types";

export const embedProviders: EmbedProvider[] = [
  {
    name: "VidSrc",
    movieUrl: (id) => `https://vidsrc.net/embed/movie/${id}`,
    tvUrl: (id, season, episode) => `https://vidsrc.net/embed/tv/${id}/${season}/${episode}`,
  },
  {
    name: "VidSrc Pro",
    movieUrl: (id) => `https://vidsrc.pro/embed/movie/${id}`,
    tvUrl: (id, season, episode) => `https://vidsrc.pro/embed/tv/${id}/${season}/${episode}`,
  },
  {
    name: "VidLink",
    movieUrl: (id) => `https://vidlink.pro/movie/${id}`,
    tvUrl: (id, season, episode) => `https://vidlink.pro/tv/${id}/${season}/${episode}`,
  },
  {
    name: "EmbedSu",
    movieUrl: (id) => `https://embed.su/embed/movie/${id}/1/1`,
    tvUrl: (id, season, episode) => `https://embed.su/embed/tv/${id}/${season}/${episode}`,
  },
  {
    name: "2Embed",
    movieUrl: (id) => `https://www.2embed.stream/embed/movie/${id}`,
    tvUrl: (id, season, episode) => `https://www.2embed.stream/embed/tv/${id}/${season}/${episode}`,
  },
  {
    name: "SuperEmbed",
    movieUrl: (id) => `https://multiembed.mov/?video_id=${id}`,
    tvUrl: (id, season, episode) => `https://multiembed.mov/?video_id=${id}`,
  },
  {
    name: "EmbedPlay",
    movieUrl: (id) => `https://embedplayapi.top/embed/${id}`,
    tvUrl: (id, season, episode) => `https://embedplayapi.top/embed/${id}?s=${season}&e=${episode}`,
  },
  {
    name: "AutoEmbed",
    movieUrl: (id) => `https://autoembed.co/movie/tmdb/${id}`,
    tvUrl: (id, season, episode) => `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`,
  },
];
