import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to login page
  };

  return (
    <nav
      style={{
        background: "#1e293b",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
      }}
    >
      <h2 style={{ color: "#38bdf8" }}>MovieMingle 🎬</h2>
      <div>
        <Link to="/home" style={{ margin: "0 1rem", color: "#f8fafc" }}>
          Home
        </Link>
        <Link to="/movies" style={{ margin: "0 1rem", color: "#f8fafc" }}>
          Movies
        </Link>
        <Link to="/watchlist" style={{ margin: "0 1rem", color: "#f8fafc" }}>
          Watchlist
        </Link>
        <Link to="/profile" style={{ margin: "0 1rem", color: "#f8fafc" }}>
          Profile
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "1rem",
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              border: "none",
              background: "#f87171",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/"
            style={{
              marginLeft: "1rem",
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              border: "none",
              background: "#10b981",
              color: "#fff",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
