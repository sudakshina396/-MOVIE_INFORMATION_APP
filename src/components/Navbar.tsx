import { Link } from "react-router-dom";
import { useState } from "react";

interface NavbarProps {
  wishlistCount: number;
}

const Navbar = ({
  wishlistCount,
}: NavbarProps) => {
  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">

        {/* Logo */}
        <Link
          to="/"
          className="navbar__brand"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="navbar__logo-svg"
            fill="currentColor"
          >
            <path d="M512 128C514 128 515.9 128.1 517.8 128.3L422.1 224L490 224L562 152C570.8 163 576 176.9 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192C64 156.7 92.7 128 128 128L198.1 128L102.1 224L170 224L265 129L266 128L358.1 128L262.1 224L330 224L425 129L426 128L512.1 128z" />
          </svg>

          <span className="navbar__logo-text">
            MovieVerse
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <div
          className="navbar__menu-icon"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </div>

        {/* Navigation Links */}
        <div
          className={`navbar__links ${
            menuOpen
              ? "navbar__links--active"
              : ""
          }`}
        >
          {/* Home */}
          <Link
            to="/"
            className="navbar__link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="nav-icon"
              fill="currentColor"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 0 128c0 35.3-28.7 64-64 64l-128 0 0-160-64 0 0 160-128 0c-35.3 0-64-28.7-64-64l0-128-32 0c-17.7 0-32-14.3-32-32.1 0-9 3.8-17.5 10.4-23.6l256-224c12.2-10.7 30.3-10.7 42.5 0l256 224c6.7 6.1 10.5 14.6 10.5 23.6z" />
            </svg>

            Home
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="navbar__wishlist-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="nav-icon"
              fill="currentColor"
            >
              <path d="M47.6 300.4L228.3 469.1c15.6 14.6 39.8 14.6 55.4 0L464.4 300.4c55.5-51.9 58.7-138.3 7.2-194.3-50.4-54.7-136.3-57.2-189.8-7.5L256 124.8 230.2 98.6c-53.5-49.7-139.4-47.2-189.8 7.5-51.5 56-48.3 142.4 7.2 194.3z" />
            </svg>

            Wishlist

            <span className="navbar__wishlist-count">
              {wishlistCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;