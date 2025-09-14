const express = require('express');
const router = express.Router();
const movies = require('../controllers/movies.controller');
const reviews = require('../controllers/reviews.controller');
const { authenticate, authorizeAdmin } = require('../middlewares/auth.middleware');

// Movies
router.get('/', movies.getMovies);
router.post('/', authenticate, authorizeAdmin, movies.createMovie);
router.get('/:id', movies.getMovieById);

// Reviews for a movie
router.get('/:id/reviews', reviews.getReviewsForMovie);
router.post('/:id/reviews', authenticate, reviews.postReviewForMovie);

module.exports = router;
