import { Movie } from "@/types/movie";
import { createQuery } from "../api/query";
import { QueryTrendingMoviesRes } from "./types";

const api_key = "fe6cb1329b44f880b214a4f880fb4a76";
const key = ["trending-movies"];
const singleMovie = ["single-movie"];
export const useGetTrendingMovies = createQuery<QueryTrendingMoviesRes>({
  url: `/trending/all/day?api_key=${api_key}`,
  key
});

export const useGetMovieById = createQuery<Movie>({
  url: `/movie/:movie_id?api_key=${api_key}`,
  key: singleMovie
});
