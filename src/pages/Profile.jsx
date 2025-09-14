import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import dummyMovies from "../components/dummyMovies";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        if (!storedUser || !token) return;

        const res = await fetch(
          `https://moviemingleatulbackend.onrender.com/api/users/${storedUser.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();

        const userData = data.user;
        const reviewsData = data.reviews || [];

        setUser({
          ...userData,
          reviews: reviewsData,
          watchlist: userData.watchlist || [],
        });
      } catch (err) {
        console.error(err);
        alert("❌ Failed to load profile");
      }
    };

    fetchUserData();
  }, []);

  const removeFromWatchlist = (id) => {
    setUser({
      ...user,
      watchlist: user.watchlist.filter((m) => m !== id),
    });
  };

  if (!user) return <p style={{ color: "#f8fafc", textAlign: "center", marginTop: "2rem" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "1200px", margin: "2rem auto", color: "#f8fafc", padding: "0 1rem" }}>
      <h1 style={{ fontSize: "2.2rem", fontWeight: "700", marginBottom: "2rem", color: "#facc15", textAlign: "center" }}>
        {user.username}'s Profile
      </h1>

      {/* Review History */}
      <section
        style={{
          background: "#1e293b",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ fontWeight: "600", marginBottom: "1rem", fontSize: "1.4rem" }}>Your Reviews</h2>
        {user.reviews?.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>You haven't added any reviews yet.</p>
        ) : (
          <ul style={{ listStyle: "disc", marginLeft: "1rem", lineHeight: "1.6" }}>
            {user.reviews?.map((r, idx) => {
              const movie = dummyMovies.find((m) => m.id === r.movieId);
              return (
                <li key={idx}>
                  <strong>{movie?.title}</strong>: {"⭐".repeat(r.rating)} - {r.text}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Watchlist */}
      <section
        style={{
          background: "#1e293b",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ fontWeight: "600", marginBottom: "1rem", fontSize: "1.4rem" }}>Your Watchlist</h2>
        {user.watchlist?.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>Your watchlist is empty. Start adding movies!</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {user.watchlist.map((id) => {
              const movie = dummyMovies.find((m) => m.id === id);
              return (
                <div
                  key={id}
                  style={{
                    position: "relative",
                    transition: "transform 0.2s",
                  }}
                  className="movie-card-container"
                >
                  <MovieCard movie={movie} />
                  <button
                    onClick={() => removeFromWatchlist(id)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      background: "#f87171",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.4rem 0.6rem",
                      cursor: "pointer",
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
