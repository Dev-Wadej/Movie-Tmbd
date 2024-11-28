"use client";
import React, { useMemo } from "react";
import MovieCard from "../components/movie-card";
import { useGetTrendingMovies } from "../services/movie/queries";

const Page = () => {
  const { data } = useGetTrendingMovies();
  const movies = useMemo(() => data?.results ?? [], [data]);
  console.log(data);
  return (
    <main>
      <header>
        <h1 className="text-3xl font-bold text-center mt-10 my-10">
          Trending Movies
        </h1>
      </header>
      <section className="max-w-screen-2xl mx-auto grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  );
};

export default Page;
