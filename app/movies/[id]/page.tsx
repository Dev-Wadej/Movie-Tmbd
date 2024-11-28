"use client";
import { useGetMovieById } from "@/app/services/movie/queries";

import Image from "next/image";

const imageUrl = "https://image.tmdb.org/t/p/w300";
const Page = ({ params }: { params: { id: string } }) => {
  const {
    data: movie,
    isLoading,
    isRefetching
  } = useGetMovieById({
    pathParams: {
      movie: params.id
    }
  });

  if (isLoading || isRefetching)
    return <div className="h-screen grid place-items-center">Loading...</div>;
  return (
    <section className="my-10">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="font-semibold text-3xl">{movie?.original_title}</h1>
        <p>{movie?.overview}</p>
        <div className="flex justify-center my-3">
          <Image
            className="object-cover rounded-lg w-[30rem]"
            width={200}
            height={200}
            src={`${imageUrl}${
              movie?.poster_path ? movie?.poster_path : movie?.backdrop_path
            }`}
            alt={movie?.title ?? "N/A"}
          />
        </div>
        <ul>
          <li>
            Released:{" "}
            {movie?.release_date && new Date(movie?.release_date).getFullYear()}
          </li>
          <li>Type: {movie?.media_type ?? "N/A"}</li>
          <li>Language: {movie?.original_language ?? "N/A"}</li>
          <li>Vote: {movie?.vote_count ?? "N/A"}</li>
        </ul>
      </div>
    </section>
  );
};

export default Page;
