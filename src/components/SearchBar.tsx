import { useRef, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const history =
      JSON.parse(
        localStorage.getItem("movieSearchHistory") || "[]"
      ) || [];

    const updatedHistory = [
      searchTerm,
      ...history.filter(
        (item: string) =>
          item.toLowerCase() !== searchTerm.toLowerCase()
      ),
    ].slice(0, 5);

    localStorage.setItem(
      "movieSearchHistory",
      JSON.stringify(updatedHistory)
    );

    onSearch(searchTerm);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search movies..."
        className="search__input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="search__button"
        onClick={handleSearch}
      >
        <svg
          className="search__icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        Search
      </button>
    </div>
  );
};

export default SearchBar;