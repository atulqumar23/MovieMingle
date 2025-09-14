import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movies from backend API
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "https://moviemingleatulbackend.onrender.com/api/movies"
        );
        setMovies(res.data.data); // API response has { data: [...] }
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "2rem",
          color: "#f8fafc",
          textAlign: "center",
        }}
      >
        Loading movies...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#0f172a",
        color: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "1rem",
          color: "#facc15",
        }}
      >
        Welcome to MovieMingle 🎬
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          color: "#cbd5e1",
          marginBottom: "2rem",
        }}
      >
        Discover trending movies, write reviews, and build your watchlist.
      </p>

      {/* Featured Movies */}
      <section style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "#38bdf8",
          }}
        >
          🌟 Featured Movies
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section>
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "#f43f5e",
          }}
        >
          🔥 Trending Now
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
