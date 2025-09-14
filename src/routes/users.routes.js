const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/:id', authenticate, users.getUser);
router.put('/:id', authenticate, users.updateUser);
router.get('/:id/watchlist', authenticate, users.getWatchlist);
router.post('/:id/watchlist', authenticate, users.addToWatchlist);
router.delete('/:id/watchlist/:movieId', authenticate, users.removeFromWatchlist);

module.exports = router;
