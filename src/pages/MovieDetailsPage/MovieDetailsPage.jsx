import React, { useEffect, useRef, useState, Suspense } from "react";
import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";
import { fetchMovieDetails } from "../../fatchAPI/fetchMovies/";

import { getFullPosterUrl } from "../../utils/getFullPosterUrl";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [posterUrl, setPosterUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();

  const backLinkLocationRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const movieDetailsData = await fetchMovieDetails(movieId);
        setMovieDetails(movieDetailsData);

        const fullPosterUrl = await getFullPosterUrl(
          movieDetailsData.poster_path
        );
        setPosterUrl(fullPosterUrl);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div>
      <Link to={backLinkLocationRef.current}>back</Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <div>
            <img src={posterUrl} alt="a" />
            <h1>{movieDetails.title}</h1>
            <p>{movieDetails.overview}</p>
          </div>
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
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
}
