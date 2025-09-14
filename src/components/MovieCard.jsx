function MovieCard({ movie }) {
  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        style={{ width: "100%", height: "330px", objectFit: "cover" }}
      />
      <div style={{ padding: "0.8rem", color: "#f8fafc" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.3rem" }}>
          {movie.title}
        </h3>
        <p style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
          {movie.genre.join(", ")} | {movie.releaseYear} | ⭐ {movie.averageRating.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
