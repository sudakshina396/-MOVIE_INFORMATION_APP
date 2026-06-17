import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  isWishlisted: boolean;
  onToggleWishlist: (movie: Movie) => void;
}

const MovieCard = ({
  movie,
  isWishlisted,
  onToggleWishlist,
}: MovieCardProps) => {
  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    onToggleWishlist(movie);
  };

  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie-card">
      <div className="movie-card__image-wrapper">
        <img
          src={poster}
          alt={movie.Title}
          className="movie-card__image"
        />

        <button
          className={`movie-card__heart ${
            isWishlisted
              ? "movie-card__heart--active"
              : ""
          }`}
          onClick={handleWishlist}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 21s-7-4.35-9.5-8C.5 9.5 2.5 5 7 5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 4.5 0 6.5 4.5 4.5 8-2.5 3.65-9.5 8-9.5 8z" />
          </svg>
        </button>

        <div className="movie-card__overlay">
          <Link
            to={`/movie/${movie.imdbID}`}
            className="movie-card__button"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">
          {movie.Title}
        </h3>

        <p className="movie-card__year">
          {movie.Year}
        </p>

        <span className="movie-card__rating">
          IMDb
        </span>
      </div>
    </div>
  );
};

export default MovieCard;