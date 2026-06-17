import MovieCard from "./MovieCard";
import type { Movie } from "../types/movie";

interface MovieGridProps {
  movies: Movie[];
  wishlist: Movie[];
  onToggleWishlist: (movie: Movie) => void;
}

const MovieGrid = ({
  movies,
  wishlist,
  onToggleWishlist,
}: MovieGridProps) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlist.some(
            (item) => item.imdbID === movie.imdbID
          )}
        />
      ))}
    </div>
  );
};

export default MovieGrid;