import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState("5");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch(
          `https://moviemingleatulbackend.onrender.com/api/movies/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch movie data");

        const data = await res.json();
        setMovie(data.movie || data);
        setReviews(data.reviews || []);
      } catch (err) {
        console.error(err);
        alert("❌ Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(
        `https://moviemingleatulbackend.onrender.com/api/movies/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: parseFloat(newRating),
            text: newText,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to submit review");

      const data = await res.json();
      // Assuming API returns the newly created review
      const addedReview = data.review || { rating: parseFloat(newRating), text: newText };
      setReviews([addedReview, ...reviews]);

      setNewText("");
      setNewRating("5");
      alert("✅ Review submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit review");
    }
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "2rem", color: "#f8fafc" }}>Loading...</p>;

  if (!movie)
    return <p style={{ textAlign: "center", marginTop: "2rem", color: "#f8fafc" }}>Movie not found.</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", color: "#f8fafc", padding: "0 1rem" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1rem",
          background: "#1e293b",
          color: "#f8fafc",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          style={{ width: "300px", borderRadius: "12px", objectFit: "cover" }}
        />

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>{movie.title}</h1>
          <p style={{ margin: "0.5rem 0" }}>🎬 Genre: {movie.genre}</p>
          <p style={{ margin: "0.5rem 0" }}>📅 Year: {movie.year || movie.releaseYear}</p>
          <p style={{ margin: "0.5rem 0" }}>⭐ Rating: {movie.rating || movie.averageRating}</p>

          <p style={{ margin: "1rem 0" }}>
            {movie.description || "No description available."}
          </p>

          {movie.cast && (
            <>
              <h3 style={{ marginTop: "1rem", fontWeight: "600" }}>Cast:</h3>
              <p>{movie.cast.join(", ")}</p>
            </>
          )}

          {movie.trailer && (
            <>
              <h3 style={{ marginTop: "1rem", fontWeight: "600" }}>Trailer:</h3>
              <div style={{ margin: "1rem 0" }}>
                <iframe
                  width="100%"
                  height="315"
                  src={movie.trailer}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "12px" }}
                ></iframe>
              </div>
            </>
          )}

          <h3 style={{ marginTop: "1rem", fontWeight: "600" }}>Reviews:</h3>
          {reviews.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No reviews yet.</p>
          ) : (
            <ul style={{ marginLeft: "1rem", listStyle: "disc" }}>
              {reviews.map((r, idx) => (
                <li key={idx}>{"⭐".repeat(r.rating)} {r.text}</li>
              ))}
            </ul>
          )}

          {/* Add Review Form */}
          <h3 style={{ marginTop: "1rem", fontWeight: "600" }}>Add Your Review:</h3>
          <form
            onSubmit={handleAddReview}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
              background: "#1e293b",
              padding: "1rem",
              borderRadius: "10px",
              marginTop: "0.5rem",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              ⭐ Rating:
              <select
                value={newRating}
                onChange={(e) => setNewRating(e.target.value)}
                style={{
                  padding: "0.3rem 0.5rem",
                  borderRadius: "6px",
                  border: "none",
                  background: "#0f172a",
                  color: "#f8fafc",
                }}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </label>

            <textarea
              rows="3"
              placeholder="Write your review..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                border: "none",
                outline: "none",
                background: "#0f172a",
                color: "#f8fafc",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "none",
                background: "#facc15",
                color: "#0f172a",
                fontWeight: "600",
                cursor: "pointer",
                alignSelf: "flex-start",
              }}
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
