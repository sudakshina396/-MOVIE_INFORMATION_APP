import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Movie } from "../types/movie";

interface WishlistProps {
  wishlist: Movie[];
  onToggleWishlist: (movie: Movie) => void;
}

const Wishlist = ({
  wishlist,
  onToggleWishlist,
}: WishlistProps) => {
  const [wishlistMovies, setWishlistMovies] =
    useState<Movie[]>(wishlist);

  useEffect(() => {
    setWishlistMovies(wishlist);
  }, [wishlist]);

  if (wishlistMovies.length === 0) {
    return (
      <div className="wishlist">
        <div className="wishlist__container">
          <div className="wishlist__empty">
            <svg
              className="wishlist__empty-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 21s-7-4.35-9.5-8C.5 9.5 2.5 5 7 5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 4.5 0 6.5 4.5 4.5 8-2.5 3.65-9.5 8-9.5 8z" />
            </svg>

            <h2 className="wishlist__empty-title">
              Your Wishlist is Empty
            </h2>

            <p className="wishlist__empty-text">
              Start adding your favorite movies.
            </p>

            <Link
              to="/"
              className="wishlist__empty-button"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="wishlist__container">
        <div className="wishlist__header">
          <h1 className="wishlist__title">
            My Wishlist
          </h1>

          <span className="wishlist__count">
            {wishlistMovies.length} Movies
          </span>
        </div>

        <div className="wishlist__grid">
          {wishlistMovies.map((movie) => (
            <div
              key={movie.imdbID}
              className="wishlist__card"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.Title}
                className="wishlist__image"
              />

              <div className="wishlist__content">
                <h3 className="wishlist__movie-title">
                  {movie.Title}
                </h3>

                <p className="wishlist__year">
                  {movie.Year}
                </p>

                <div className="wishlist__actions">
                  <Link
                    to={`/movie/${movie.imdbID}`}
                    className="wishlist__details-button"
                  >
                    View Details
                  </Link>

                  <button
                    className="wishlist__remove-button"
                    onClick={() =>
                      onToggleWishlist(movie)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;