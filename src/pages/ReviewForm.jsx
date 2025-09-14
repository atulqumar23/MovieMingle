import { useParams } from "react-router-dom";
import { useState } from "react";

function ReviewForm() {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Review for Movie ${id}: ${rating}⭐ - ${text}`);
    setRating(0);
    setText("");
  };

  return (
    <div className="container">
      <h2>Write Review for Movie {id}</h2>
      <form onSubmit={handleSubmit}>
        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <label>Your Review:</label>
        <textarea
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;
