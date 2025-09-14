import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import ReviewForm from "./pages/ReviewForm";
import WatchlistPage from "./components/WatchlistPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/review/:id" element={<ReviewForm />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </div>
  );
}

export default App;
