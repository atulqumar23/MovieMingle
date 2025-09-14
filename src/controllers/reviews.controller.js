const Review = require('../models/review.model');
const Movie = require('../models/movie.model');
const Joi = require('joi');

const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  text: Joi.string().allow('', null)
});

exports.getReviewsForMovie = async (req, res, next) => {
  const movieId = req.params.id;
  const reviews = await Review.find({ movie: movieId }).populate('user', 'username profilePicture').sort({ createdAt: -1 });
  res.json(reviews);
};

exports.postReviewForMovie = async (req, res, next) => {
  try {
    const { error, value } = reviewSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { rating, text } = value;
    const movieId = req.params.id;
    // optionally prevent duplicate reviews by same user: unique index enforces
    const review = await Review.findOneAndUpdate(
      { user: req.user._id, movie: movieId },
      { rating, text, createdAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Recalculate average rating
    const aggr = await Review.aggregate([
      { $match: { movie: review.movie } },
      { $group: { _id: '$movie', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);

    if (aggr.length) {
      await Movie.findByIdAndUpdate(review.movie, { averageRating: aggr[0].avg, reviewsCount: aggr[0].count });
    }

    res.status(201).json(review);
  } catch (err) { next(err); }
};
