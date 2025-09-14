const Movie = require('../models/movie.model');
const Review = require('../models/review.model');
const Joi = require('joi');
const mongoose = require('mongoose');

// GET /movies
exports.getMovies = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.genre) filter.genre = req.query.genre;
    if (req.query.year) filter.releaseYear = parseInt(req.query.year);
    if (req.query.minRating) filter.averageRating = { $gte: parseFloat(req.query.minRating) };
    if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' };

    const [items, total] = await Promise.all([
      Movie.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Movie.countDocuments(filter)
    ]);

    res.json({
      data: items,
      meta: { total, page, limit, pages: Math.ceil(total/limit) }
    });
  } catch (err) { next(err); }
};

// GET /movies/:id
exports.getMovieById = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(movieId)) return res.status(400).json({ message: 'Invalid id' });

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Not found' });

    const reviews = await Review.find({ movie: movieId }).populate('user', 'username profilePicture').sort({ createdAt: -1 });
    res.json({ movie, reviews });
  } catch (err) { next(err); }
};

// POST /movies (admin)
const movieSchema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.array().items(Joi.string()).optional(),
  releaseYear: Joi.number().optional(),
  director: Joi.string().optional(),
  cast: Joi.array().items(Joi.string()).optional(),
  synopsis: Joi.string().optional(),
  posterUrl: Joi.string().uri().optional()
});

exports.createMovie = async (req, res, next) => {
  try {
    const { error, value } = movieSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const movie = await Movie.create(value);
    res.status(201).json(movie);
  } catch (err) { next(err); }
};
