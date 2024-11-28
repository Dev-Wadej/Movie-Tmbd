import { Movie } from "@/types/movie";

export type QueryTrendingMoviesRes = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
