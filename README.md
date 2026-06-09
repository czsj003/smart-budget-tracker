# Smart Budget Tracker

A full-stack personal finance and subscription management application built with React, Node.js, Express, and MongoDB.

## Live Demo

[View Live Demo](https://smart-budget-tracker-livid.vercel.app)

Backend API: https://smart-budget-tracker-api-mc5a.onrender.com

Note: The backend is hosted on Render's free tier, so the first request may take up to 50 seconds if the server is sleeping.

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Features

- User registration and login with JWT authentication
- Protected routes and user-specific data access
- Income and expense transaction management
- Dashboard summary with income, expenses, balance, and monthly stats
- Category-based expense breakdown
- Monthly income vs expense trend chart
- Budget tracking with warning and exceeded alerts
- Recurring subscription management
- Upcoming subscription bill insights
- Transaction search, filtering, sorting, pagination
- CSV export for transactions

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Recharts
- Vite

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```
smart-budget-tracker/
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── utils/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
└── README.md
```

## Environment Variables

### Server

Create a .env file inside the server folder:

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- NODE_ENV=development
- CLIENT_URL=http://localhost:5173

### Client

Create a .env file inside the client folder:
VITE_API_URL=http://localhost:5000/api

### Local Setup
1. Install server dependencies
cd server
npm install
2. Run server
npm run dev
3. Install client dependencies
cd client
npm install
4. Run client
npm run dev

### API Overview

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/me

### Transactions
- GET    /api/transactions
- POST   /api/transactions
- GET    /api/transactions/:id
- PUT    /api/transactions/:id
- DELETE /api/transactions/:id

### Summary
- GET /api/summary

### Budgets
- GET    /api/budgets
- POST   /api/budgets
- PUT    /api/budgets/:id
- DELETE /api/budgets/:id
- GET    /api/budgets/status

### Subscriptions
- GET    /api/subscriptions
- POST   /api/subscriptions
- PUT    /api/subscriptions/:id
- DELETE /api/subscriptions/:id
- GET    /api/subscriptions/summary

# Future Improvements
- Email reminders for upcoming bills
- Automatic transaction generation from subscriptions
- Dark mode
- Demo account
- Export all filtered transactions
- Advanced analytics
- Unit and integration tests
