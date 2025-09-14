const User = require("../models/user.model");
const Watchlist = require("../models/watchlist.model");
const Review = require("../models/review.model");
const Movie = require("../models/movie.model");
const Joi = require("joi");
const { default: mongoose } = require("mongoose");

exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  if (req.user._id.toString() !== id && req.user.role !== "admin") {
    // optional: limit access; but return profile and public review history
  }
  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  const reviews = await Review.find({ user: id })
    .populate("movie", "title posterUrl")
    .sort({ createdAt: -1 });
  res.json({ user, reviews });
};

exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  if (req.user._id.toString() !== id && req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });

  const schema = Joi.object({
    username: Joi.string().min(3),
    profilePicture: Joi.string().uri(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const user = await User.findByIdAndUpdate(id, value, { new: true }).select(
    "-password"
  );
  res.json(user);
};

// Watchlist
exports.getWatchlist = async (req, res, next) => {
  const userId = req.params.id;
  const items = await Watchlist.find({ user: userId }).populate("movie");
  res.json(items);
};

exports.addToWatchlist = async (req, res, next) => {
  const userId = req.params.id;
  const movieId = req.body.movieId;
  // check permission: only allowed for same user or admin
  if (req.user._id.toString() !== userId && req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });
  await Watchlist.create({
    user: new mongoose.Types.ObjectId(userId),
    movie: new mongoose.Types.ObjectId(movieId),
  });
  res.status(201).json({ message: "Added" });
};

exports.removeFromWatchlist = async (req, res, next) => {
  const userId = req.params.id;
  const movieId = req.params.movieId;
  if (req.user._id.toString() !== userId && req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });
  await Watchlist.findOneAndDelete({ user: userId, movie: movieId });
  res.json({ message: "Removed" });
};
