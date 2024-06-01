import { useLocation } from "react-router-dom";
import MovieItem from "./MovieItem/MovieItem";
import css from "../MovieList/MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <div>
      <ul className={css.movieList}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
