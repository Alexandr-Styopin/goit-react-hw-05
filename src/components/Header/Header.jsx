import { NavLink } from "react-router-dom";
import css from "../Header/Header.module.css";

export default function Header() {
  return (
    <div className={css.header}>
      <div className={css.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.navLinkActive}` : css.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.navLinkActive}` : css.navLink
          }
        >
          Movies
        </NavLink>
      </div>
    </div>
  );
}
