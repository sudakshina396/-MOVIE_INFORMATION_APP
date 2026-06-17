import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { Movie, MovieDetails } from "../types/movie";

const API_KEY = "1309c466";

interface MovieDetailsProps {
  wishlist?: Movie[];
  onToggleWishlist?: (movie: Movie) => void;
}

export default function MovieDetails({
  wishlist = [],
  onToggleWishlist,
}: MovieDetailsProps) {
  const { id } = useParams();

  const movieId = id ?? "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState<MovieDetails | null>(
    null
  );

  useEffect(() => {
    if (!movieId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");
        setDetails(null);

        // Use i= and plot=full so we reliably get full details
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}&plot=full`
        );

        const data = (await response.json()) as MovieDetails & {
          Response?: string;
          Error?: string;
        };

        if (data.Response === "False") {
          setError(data.Error || "Movie not found");
          return;
        }

        setDetails(data);
      } catch {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  const isWishlisted = useMemo(() => {
    if (!details) return false;
    return wishlist.some((m) => m.imdbID === details.imdbID);
  }, [details, wishlist]);

  const toggleWishlist = () => {
    if (!details || !onToggleWishlist) return;

    // Movie card type is smaller; map details -> Movie
    const movie: Movie = {
      imdbID: details.imdbID,
      Title: details.Title,
      Year: details.Year,
      Poster: details.Poster,
      Type: details.Type,
    };

    onToggleWishlist(movie);
  };

  return (
    <div className="details">
      <div className="details__container">
        <div className="details__content-wrapper">
          <div className="details__poster-wrapper">
            <img
              className="details__poster"
              src={
                details?.Poster && details.Poster !== "N/A"
                  ? details.Poster
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={details?.Title ?? "Movie poster"}
            />
          </div>

          <div className="details__content">
            <h1 className="details__title">
              {loading && !details ? "Loading..." : details?.Title}
            </h1>

            {error && (
              <div className="error">
                <p className="error__text">{error}</p>
              </div>
            )}

            {!error && details && (
              <>
                <span className="details__rating">
                  IMDb {details.imdbRating}
                </span>

                <div className="details__meta">
                  <p>
                    <strong>Year:</strong> {details.Year}
                  </p>
                  <p>
                    <strong>Genre:</strong> {details.Genre}
                  </p>
                  <p>
                    <strong>Director:</strong> {details.Director}
                  </p>
                  <p>
                    <strong>Actors:</strong> {details.Actors}
                  </p>
                </div>

                <div className="details__plot">
                  <strong>Plot:</strong>
                  <p>{details.Plot}</p>
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button
                    className="details__wishlist-button"
                    onClick={toggleWishlist}
                    type="button"
                    disabled={!onToggleWishlist}
                    style={{
                      opacity: onToggleWishlist ? 1 : 0.6,
                      background: isWishlisted ? "#e11d48" : "#e11d48",
                    }}
                  >
                    {isWishlisted
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                  </button>

                  <Link
                    to="/"
                    className="details__back-button"
                  >
                    Back to Home
                  </Link>
                </div>

                <div className="similar">
                  <h2 className="similar__title">Similar Movies</h2>
                  <p style={{ color: "var(--text-secondary)" }}>
                    (Not implemented)
                  </p>
                </div>
              </>
            )}

            {loading && details === null && (
              <p style={{ color: "var(--text-secondary)" }}>
                Fetching movie details...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

