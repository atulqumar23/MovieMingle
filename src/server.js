require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const moviesRoutes = require('./routes/movies.routes');
const usersRoutes = require('./routes/users.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiter
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: { message: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/users', usersRoutes);

// Error handler
app.use(errorHandler);

// DB connect + start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log('🚀 Server running on', port));
  })
  .catch(err => {
    console.error('❌ DB connection error', err);
    process.exit(1);
  });
