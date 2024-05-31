import { useLocation } from "react-router-dom";
import MovieItem from "./MovieItem/MovieItem";

export default function MovieList({ movies }) {
  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
