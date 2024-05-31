import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesTrending } from "../../fatchAPI/fetchMovies/";

export default function HomePage(params) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieTrending = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMoviesTrending();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovieTrending();
  }, []);
  return (
    <div>
      {loading ? <Loader /> : error ? <Error /> : <MovieList movies={movies} />}
    </div>
  );
}
