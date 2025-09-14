🎬 Movie Review Platform

A full-stack web application where users can browse movies, read and write reviews, rate films, and manage a personal watchlist.

Built with React (frontend) and Node.js + Express + MongoDB (backend).

✨ Features

🏠 Home Page – Featured & trending movies

🔍 Movie Listing – Search & filter by genre, year, rating

🎞 Movie Details Page – Cast, synopsis, reviews, trailer (optional)

⭐ Reviews – Add star ratings & text reviews

👤 User Profile – Review history & watchlist

📌 Watchlist – Add/remove movies

🔑 Authentication – User registration & login (JWT)

⚡ RESTful API with validation & error handling

🛠 Tech Stack

Frontend

React, React Router

Axios (API calls)

Backend

Node.js, Express

MongoDB 

JWT + bcrypt (authentication & password hashing)

⚙️ Setup & Installation
1. Clone the Repository
git clone https://github.com/your-username/movie-review-platform.git
cd movie-review-platform

2. Backend Setup
cd backend
npm install


Create a .env file inside backend/ with:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key


Run backend:

npm run server

3. Frontend Setup
cd frontend
npm install
npm start

📚 API Endpoints
Movies

GET /movies – Get all movies (pagination + filters)

GET /movies/:id – Get movie details with reviews

POST /movies – Add a movie (admin only)

Reviews

GET /movies/:id/reviews – Get all reviews for a movie

POST /movies/:id/reviews – Add a new review

Users

GET /users/:id – Get user profile + reviews

PUT /users/:id – Update profile

Watchlist

GET /users/:id/watchlist – Get user’s watchlist

POST /users/:id/watchlist – Add movie to watchlist

DELETE /users/:id/watchlist/:movieId – Remove movie

🔒 Authentication

Register/Login with JWT-based authentication

Passwords securely hashed using bcrypt

🚀 Future Enhancements

🎥 Movie recommendations based on ratings

🛠 Admin dashboard for managing movies & users

🔔 Real-time notifications (new reviews, watchlist updates)

🔎 Advanced search with multiple filters

🌍 Deployment on Vercel + Render

📄 License

This project is for educational purposes as part of a Full Stack Developer assignment.
