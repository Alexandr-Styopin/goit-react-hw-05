import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../fatchAPI/fetchMovies";

import { getFullPosterUrl } from "../../utils/getFullPosterUrl";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";

import CastList from "./MovieCastList/MovieCastList";
import css from "../MovieCast/MovieCast.module.css";
export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      try {
        setError(false);
        setLoading(true);
        const castData = await fetchMovieCredits(movieId);
        const updatedCast = await Promise.all(
          castData.cast.map(async (member) => {
            const fullPosterUrl = await getFullPosterUrl(member.profile_path);
            return { ...member, fullPosterUrl };
          })
        );
        setCast(updatedCast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <div>
      {loading ? <Loader /> : error ? <Error /> : <CastList cast={cast} />}
    </div>
  );
}
