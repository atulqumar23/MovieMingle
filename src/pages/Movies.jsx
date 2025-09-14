import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  // Fetch movies from API
  useEffect(() => {
    fetch("https://moviemingleatulbackend.onrender.com/api/movies")
      .then((res) => res.json())
      .then((data) => {
        // API response has { data: [...] }
        setMovies(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre ? movie.genre.includes(genre) : true) &&
      (year ? movie.releaseYear.toString() === year : true) &&
      (rating ? movie.averageRating >= parseFloat(rating) : true)
    );
  });

  const addToWatchlist = async (movieId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://moviemingleatulbackend.onrender.com/api/users/${movieId}/watchlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token in headers
          },
          body: JSON.stringify({ movieId }), // Send the clicked movie ID
        }
      );

      if (!res.ok) throw new Error("Failed to add to watchlist");

      const movie = movies.find((m) => m._id === movieId);
      setWatchlist((prev) => [...prev, movie]);
      alert("✅ Movie added to watchlist!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add movie to watchlist");
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#0f172a",
        minHeight: "100vh",
        color: "#f8fafc",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#facc15",
        }}
      >
        🎬 Browse Movies
      </h2>

      {/* Filters Section */}
      <div
        style={{
          background: "#1e293b",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1",
            minWidth: "220px",
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "1rem",
            background: "#0f172a",
            color: "#f8fafc",
          }}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            border: "none",
            minWidth: "150px",
            fontSize: "1rem",
            background: "#0f172a",
            color: "#f8fafc",
          }}
        >
          <option value="">All Genres</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Action">Action</option>
          <option value="Thriller">Thriller</option>
          <option value="Romance">Romance</option>
          <option value="Drama">Drama</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            border: "none",
            minWidth: "150px",
            fontSize: "1rem",
            background: "#0f172a",
            color: "#f8fafc",
          }}
        >
          <option value="">All Years</option>
          {[1999, 2008, 2009, 2010, 2014, 2016, 2019].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            border: "none",
            minWidth: "150px",
            fontSize: "1rem",
            background: "#0f172a",
            color: "#f8fafc",
            height: "auto",
          }}
        >
          <option value="">All Ratings</option>
          <option value="4.0">4.0+</option>
          <option value="4.5">4.5+</option>
          <option value="4.8">4.8+</option>
        </select>
      </div>

      {/* Movies Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "2rem",
          justifyContent: "center",
          maxWidth: "auto",
          margin: "0 auto",
        }}
      >
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie._id}>
              <div
                onClick={() => navigate(`/movie/${movie._id}`)}
                style={{ cursor: "pointer" }}
              >
                <MovieCard movie={movie} />
              </div>

              {/* Watchlist Button */}
              <button
                onClick={() => addToWatchlist(movie._id)}
                style={{
                  marginTop: "0.5rem",
                  width: "100%",
                  padding: "0.5rem 0",
                  borderRadius: "6px",
                  border: "none",
                  background: watchlist.find((m) => m._id === movie._id)
                    ? "#f87171"
                    : "#10b981",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {watchlist.find((m) => m._id === movie._id)
                  ? "Remove from Watchlist"
                  : "Add to Watchlist"}
              </button>
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              color: "#94a3b8",
            }}
          >
            ❌ No movies found matching your filters.
          </p>
        )}
      </div>
    </div>
  );
}

export default Movies;
