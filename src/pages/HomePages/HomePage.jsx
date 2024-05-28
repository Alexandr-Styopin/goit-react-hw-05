import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMoviesTrending } from "../../fatchAPI/fetchMovies/";

export default function HomePage(params) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const getMovieTrending = async () => {
      try {
        const data = await fetchMoviesTrending();
        setTrendingMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieTrending();
  }, []);

  return (
    <div>
      <p>Home page</p>
      <MovieList movies={trendingMovies} />
    </div>
  );
}
