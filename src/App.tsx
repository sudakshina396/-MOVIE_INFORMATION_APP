import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Wishlist from "./pages/Wishlist";


const HomeComp: any = Home;
const MovieDetailsComp: any = MovieDetails;
const WishlistComp: any = Wishlist;

import type { Movie } from "./types/movie";

const App = () => {
  const [wishlist, setWishlist] =
    useState<Movie[]>([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlistMovies") ||
        "[]"
    );

    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "wishlistMovies",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const toggleWishlist = (movie: Movie) => {
    const exists = wishlist.some(
      (item) => item.imdbID === movie.imdbID
    );

    if (exists) {
      setWishlist(
        wishlist.filter(
          (item) =>
            item.imdbID !== movie.imdbID
        )
      );
    } else {
      setWishlist([
        ...wishlist,
        movie,
      ]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar
        wishlistCount={wishlist.length}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomeComp
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/movie/:id"
          element={
            <MovieDetailsComp
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <WishlistComp
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;