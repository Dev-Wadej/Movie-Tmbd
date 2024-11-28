"use client";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  movie: Movie;
};
const MovieCard = ({ movie }: Props) => {
  const router = useRouter();
  return (
    <div
      className="bg-slate-50 rounded-lg p-3 cursor-pointer"
      onClick={() => router.push(`/movies/${movie?.id.toString()}`)}
    >
      <Image
        className="object-cover rounded-lg w-full"
        width={200}
        height={200}
        src={`https://image.tmdb.org/t/p/w300${
          movie?.poster_path ? movie?.poster_path : movie?.backdrop_path
        }`}
        alt={movie.title}
      />
      <div>
        <h3 className="text-lg font-bold mt-2">
          {movie?.title ?? movie?.original_title}
        </h3>
        <p className="text-sm truncate">{movie?.overview}</p>
        <p className="font-semibold text-sm flex justify-between">
          <span>
            year:{" "}
            {movie?.release_date && new Date(movie?.release_date).getFullYear()}
          </span>
          <span>vote:{movie?.vote_count}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
