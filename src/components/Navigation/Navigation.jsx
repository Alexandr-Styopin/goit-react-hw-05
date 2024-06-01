import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <div className={css.navigation}>
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
