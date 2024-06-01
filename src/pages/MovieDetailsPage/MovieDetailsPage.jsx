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

import css from "../MovieDetailsPage/MovieDetailsPage.module.css";

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
    <div className={css.container}>
      <Link to={backLinkLocationRef.current} className={css.backLink}>
        back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <div className={css.wrapper}>
            <img
              src={posterUrl}
              alt={movieDetails.title}
              className={css.poster}
            />
            <div>
              <h1 className={css.title}>{movieDetails.title}</h1>
              <p className={css.overview}>{movieDetails.overview}</p>
            </div>
          </div>
          <div className={css.navigation}>
            <ul>
              <li>
                <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
              </li>
              <li>
                <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
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
