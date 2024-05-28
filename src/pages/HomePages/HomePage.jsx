import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesTrending } from "../../fatchAPI/fetchMovies/";

export default function HomePage(params) {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getMovieTrending = async () => {
      try {
        const data = await fetchMoviesTrending();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieTrending();
  }, []);
  return (
    <div>
      <p>Home page</p>
      <MovieList movies={movies} />
    </div>
  );
}
