import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../fatchAPI/fetchMovies";

import { getFullPosterUrl } from "../../utils/getFullPosterUrl";

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async () => {
      const castData = await fetchMovieCredits(movieId);

      const updatedCast = await Promise.all(
        castData.cast.map(async (member) => {
          const fullPosterUrl = await getFullPosterUrl(member.profile_path);
          return { ...member, fullPosterUrl };
        })
      );

      setCast(updatedCast);

      try {
      } catch (error) {
        console.log(error);
      }
    };
    getCast();
  }, [movieId]);
  return (
    <div>
      <ul>
        {cast.map(({ id, name, fullPosterUrl }) => (
          <li key={id}>
            <p>{name}</p>
            <img src={`${fullPosterUrl}`}></img>
          </li>
        ))}
      </ul>
    </div>
  );
}
