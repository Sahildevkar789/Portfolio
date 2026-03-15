# Modern Developer Portfolio & Admin Dashboard

A stunning, creative, and fully responsive MERN stack portfolio application built for developers looking to showcase their projects smoothly.

## Features

- **Frontend & UI/UX**
  - **React & Vite**: Extremely fast HMR and optimized builds.
  - **Tailwind CSS**: Modern utility-first styling for glassmorphism and beautiful gradients.
  - **Framer Motion**: Page transitions and element scroll animations.
  - **Dark/Light Mode**: Integrated toggle with context API and local storage persistence.
  - **Interactive Terminal**: A unique simulator for commands like `help`, `skills`, `projects` to give a true developer feel.

- **Backend & Admin Panel**
  - **Node.js + Express**: REST APIs for managing the portfolio.
  - **MongoDB**: Storage for projects, skills, certifications, and admin user data.
  - **JWT Authentication**: Secured admin dashboard to add, edit, and delete projects.

## Project Structure

This is a monorepo setup:
- `/frontend`: The React Vite application containing all the UI.
- `/backend`: The Express server containing APIs, models, and controllers.

## Prerequisites

- Node.js installed (v16+)
- MongoDB connection string (Atlas or Local)

## Installation & Setup

### 1. Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a *new* terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies (Using `--legacy-peer-deps` might be needed for specific libraries):
   ```bash
   npm install
   ```
3. Set the backend URL. Create a `.env` file in `frontend/`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 3. Usage
Navigate to `http://localhost:5173` to view the beautiful portfolio interface.

For the Admin dashboard, navigate to `http://localhost:5173/admin/login`.

## Contact

Created by Sahil Santosh Devkar - [LinkedIn](https://linkedin.com/in/sahildevkar) - [GitHub](https://github.com/sahildevkar)
