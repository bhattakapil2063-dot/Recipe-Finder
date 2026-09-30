import { NavLink } from "react-router-dom";

export default function Navbar({ favoriteCount }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <span className="brand">Recipe Finder</span>
        <nav>
          <NavLink to="/" end>
            Search
          </NavLink>
          <NavLink to="/favorites">Favorites ({favoriteCount})</NavLink>
        </nav>
      </div>
    </header>
  );
}
