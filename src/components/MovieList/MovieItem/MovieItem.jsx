import { NavLink, useLocation } from "react-router-dom";
import css from "../MovieItem/MovieItem.module.css";

export default function MovieItem({ movie: { id, title } }) {
  const location = useLocation();
  return (
    <li className={css.movieItem}>
      <NavLink to={`/movies/${id}`} state={location} className={css.movieLink}>
        <p className={css.movieTitle}>{title}</p>
      </NavLink>
    </li>
  );
}
