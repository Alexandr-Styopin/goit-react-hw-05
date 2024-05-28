import React, { useEffect, useState } from "react";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import BackBtn from "../../components/BackBtn/BackBtn";
import { fetchMovieDetails } from "../../fatchAPI/fetchMovies/";

import { getFullPosterUrl } from "../../utils/getFullPosterUrl";

export default function MovieDetailsPage() {
  const location = useLocation();

  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [posterUrl, setPosterUrl] = useState("");
  console.log(location);
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieDetailsData = await fetchMovieDetails(movieId);
        setMovieDetails(movieDetailsData);

        const fullPosterUrl = await getFullPosterUrl(
          movieDetailsData.poster_path
        );
        setPosterUrl(fullPosterUrl);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BackBtn />
      <div>
        <img src={posterUrl} alt="a" />
        <h1>{movieDetails.title}</h1>
        <p>{movieDetails.overview}</p>
        <div>
          <ul>
            <li>
              <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
            </li>
            <li>
              <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
