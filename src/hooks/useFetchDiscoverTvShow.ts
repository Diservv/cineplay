"use client";

import { tmdb, tmdbLanguage } from "@/api/tmdb";
import { DiscoverTvShowsFetchQueryType } from "@/types/movie";
import { TvShowDiscoverResult } from "tmdb-ts/dist/types/discover";

interface FetchDiscoverTvShows {
  page?: number;
  type?: DiscoverTvShowsFetchQueryType;
  genres?: string;
}

const useFetchDiscoverTvShows = ({
  page = 1,
  type = "discover",
  genres,
}: FetchDiscoverTvShows): Promise<TvShowDiscoverResult> => {
  const discover = () =>
    tmdb.discover.tvShow({ page: page, with_genres: genres, language: tmdbLanguage });
  const todayTrending = () =>
    tmdb.trending.trending("tv", "day", { page: page, language: tmdbLanguage });
  const thisWeekTrending = () =>
    tmdb.trending.trending("tv", "week", { page: page, language: tmdbLanguage });
  const popular = () => tmdb.tvShows.popular({ page: page, language: tmdbLanguage });
  const onTheAir = () => tmdb.tvShows.onTheAir({ page: page, language: tmdbLanguage });
  const topRated = () => tmdb.tvShows.topRated({ page: page, language: tmdbLanguage });

  const queryData = {
    discover,
    todayTrending,
    thisWeekTrending,
    popular,
    onTheAir,
    topRated,
  }[type];

  // @ts-expect-error: Property 'adult' is missing in type 'PopularTvShowResult' but required in type 'TV'.
  return queryData();
};

export default useFetchDiscoverTvShows;
