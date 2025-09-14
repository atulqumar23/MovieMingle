const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  rating: { type: Number, min:1, max:5, required: true },
  text: { type: String },
  createdAt: { type: Date, default: Date.now }
});

reviewSchema.index({ user: 1, movie: 1 }, { unique: true }); // optional: one review per user/movie

module.exports = mongoose.model('Review', reviewSchema);
