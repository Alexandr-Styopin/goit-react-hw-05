import { NavLink } from "react-router-dom";

export default function MovieItem({ movie: { id, title } }) {
  return (
    <li>
      <NavLink to={`/movies/${id}`}>{title}</NavLink>
    </li>
  );
}
