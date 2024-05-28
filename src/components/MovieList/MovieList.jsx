import MovieItem from "./MovieItem/MovieItem";

export default function MovieList({ movies }) {
  return (
    <div>
      <p>Movies list</p>
      <ul>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
