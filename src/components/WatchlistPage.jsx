import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!user || !token) {
        setWatchlist([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://moviemingleatulbackend.onrender.com/api/users/${user.id}/watchlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch watchlist");

        setWatchlist(data); // Assuming API returns an array of movies
      } catch (err) {
        console.error(err);
        setWatchlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#0f172a",
        color: "#f8fafc",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "2rem",
          color: "#facc15",
        }}
      >
        ⭐ My Watchlist
      </h2>

      {loading ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#94a3b8" }}>
          Loading...
        </p>
      ) : watchlist.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#94a3b8" }}>
          Your watchlist is empty. Add some movies!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
          }}
        >
          {watchlist.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
