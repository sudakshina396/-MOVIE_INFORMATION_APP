import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import SkeletonCard from "../components/SkeletonCard";

import type {
  Movie,
  SearchResponse,
} from "../types/movie";

const API_KEY = "1309c466";

interface HomeProps {
  wishlist: Movie[];
  onToggleWishlist: (movie: Movie) => void;
}

function Home({
  wishlist,
  onToggleWishlist,
}: HomeProps) {
  const [movies, setMovies] =
    useState<Movie[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [history, setHistory] =
    useState<string[]>([]);

  const fetchMovies = async (
    query: string
  ) => {
    try {
      setLoading(true);

      setError("");

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );

      const data: SearchResponse =
        await response.json();

      if (data.Response === "False") {
        setMovies([]);

        setError(
          data.Error ||
            "Movie not found"
        );

        return;
      }

      setMovies(data.Search || []);

      const updatedHistory = [
        query,
        ...history.filter(
          (item) => item !== query
        ),
      ].slice(0, 5);

      setHistory(updatedHistory);

      localStorage.setItem(
        "movieSearchHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (err) {
      setMovies([]);

      setError(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("Batman");

    const savedHistory =
      JSON.parse(
        localStorage.getItem(
          "movieSearchHistory"
        ) || "[]"
      );

    setHistory(savedHistory);
  }, []);

  return (
    <div className="home">
      <Hero />

      <div className="home__container">

        <SearchBar
          onSearch={fetchMovies}
        />

        {history.length > 0 && (
          <div className="search__history">

            <h3 className="search__history-title">
              Recent Searches
            </h3>

            <div className="search__history-list">
              {history.map(
                (item, index) => (
                  <button
                    key={index}
                    className="search__history-item"
                    onClick={() =>
                      fetchMovies(item)
                    }
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {!loading &&
          movies.length > 0 && (
            <div className="home__results">
              <h2 className="home__title">
                Movies Found (
                {movies.length})
              </h2>
            </div>
          )}

        {loading && (
          <div className="movie-grid">
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <SkeletonCard
                key={index}
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="error">
            <p className="error__text">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <MovieGrid
            movies={movies}
            wishlist={wishlist}
            onToggleWishlist={
              onToggleWishlist
            }
          />
        )}
      </div>
    </div>
  );
}

export default Home;