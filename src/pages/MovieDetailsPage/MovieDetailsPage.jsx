import React, { useEffect, useRef, useState } from "react";
import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../fatchAPI/fetchMovies/";

import { getFullPosterUrl } from "../../utils/getFullPosterUrl";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [posterUrl, setPosterUrl] = useState("");

  const { movieId } = useParams();
  const location = useLocation();

  const backLinkLocationRef = useRef(location.state ?? "/movies");

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
      <Link to={backLinkLocationRef.current}>back</Link>
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
