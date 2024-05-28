import { NavLink, useLocation } from "react-router-dom";

export default function MovieItem({ movie: { id, title } }) {
  const location = useLocation();
  return (
    <li>
      <NavLink to={`/movies/${id}`} state={location.pathname}>
        {title}
      </NavLink>
    </li>
  );
}
