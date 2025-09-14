import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const API_BASE = "https://moviemingleatulbackend.onrender.com/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = isSignup
      ? { username, email, password, role } // Signup payload
      : { email, password }; // Login payload

    try {
      const res = await fetch(
        `${API_BASE}/${isSignup ? "register" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(isSignup ? "✅ Signup Successful" : "✅ Login Successful");
      navigate("/home");
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "#f8fafc",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "2rem",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "400px",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            color: "#facc15",
            fontSize: "1.8rem",
          }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={inputStyle}
              />

              <select
                value={role}
                onChange={(e) => setRole("admin")}
                required
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  background: "#0f172a",
                  color: "#f8fafc",
                  fontSize: "1rem",
                }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem", color: "#94a3b8" }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            style={{ color: "#38bdf8", cursor: "pointer", fontWeight: "600" }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

// Reusable input style
const inputStyle = {
  width: "auto",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "#0f172a",
  color: "#f8fafc",
  fontSize: "1rem",
};

// Button style
const buttonStyle = {
  padding: "0.6rem 1rem",
  borderRadius: "8px",
  border: "none",
  background: "#10b981",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "1rem",
};

export default AuthPage;
