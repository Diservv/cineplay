"use client";

import { tmdb, tmdbLanguage } from "@/api/tmdb";
import { DiscoverMoviesFetchQueryType } from "@/types/movie";
import { MovieDiscoverResult } from "tmdb-ts/dist/types/discover";

interface FetchDiscoverMovies {
  page?: number;
  type?: DiscoverMoviesFetchQueryType;
  genres?: string;
}

const useFetchDiscoverMovies = ({
  page = 1,
  type = "discover",
  genres,
}: FetchDiscoverMovies): Promise<MovieDiscoverResult> => {
  const discover = () =>
    tmdb.discover.movie({ page: page, with_genres: genres, language: tmdbLanguage });
  const todayTrending = () =>
    tmdb.trending.trending("movie", "day", { page: page, language: tmdbLanguage });
  const thisWeekTrending = () =>
    tmdb.trending.trending("movie", "week", { page: page, language: tmdbLanguage });
  const popular = () => tmdb.movies.popular({ page: page, language: tmdbLanguage });
  const nowPlaying = () => tmdb.movies.nowPlaying({ page: page, language: tmdbLanguage });
  const upcoming = () => tmdb.movies.upcoming({ page: page, language: tmdbLanguage });
  const topRated = () => tmdb.movies.topRated({ page: page, language: tmdbLanguage });

  const queryData = {
    discover,
    todayTrending,
    thisWeekTrending,
    popular,
    nowPlaying,
    upcoming,
    topRated,
  }[type];

  return queryData();
};

export default useFetchDiscoverMovies;
