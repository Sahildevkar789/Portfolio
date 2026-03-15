# Deployment Guide for Modern Developer Portfolio

This guide outlines exactly how to deploy your MERN Stack portfolio to production.

## 1. Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create an account.
2. Build a Database (Free cluster works fine).
3. Under Database Access, create a user and save the password.
4. Under Network Access, allow access from anywhere (`0.0.0.0/0`).
5. Click Connect -> Connect your application -> Copy the Connection String.
6. Replace `<username>` and `<password>` with the user credentials you created. Keep this string safe!

## 2. Backend Hosting (Render / Railway)
We strongly recommend Render because it's free and easy to use for Node.js backends.

### Deploying on Render:
1. Push your code to GitHub. Make sure the `.env` file is in `.gitignore` so your secrets don't leak!
2. Go to [Render.com](https://render.com) and create an account.
3. Click "New" -> "Web Service".
4. Connect your GitHub repository.
5. Setup the following configurations:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Add Environment Variables in Render settings:
   - `PORT`: 5000 (Or leave empty, Render will assign one)
   - `MONGODB_URI`: (Paste your MongoDB connection string here)
   - `JWT_SECRET`: (Create a random secure string, e.g., `s3cr3t_my_portfolio_auth_key`)
   - `NODE_ENV`: `production`
7. Click "Deploy". Once finished, copy the backend URL Render provides. 

## 3. Frontend Hosting (Vercel)
Vercel is the industry standard for React (Vite) applications.

### Deploying on Vercel:
1. Ensure your latest code is on GitHub.
2. Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
3. Click "Add New" -> "Project" -> Import your Portfolio repository.
4. Set the configurations:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
5. Environment Variables:
   - Name: `VITE_API_URL`
   - Value: `(Your Render backend URL from step 2, e.g., https://my-portfolio-api.onrender.com/api)`
6. Click "Deploy". Wait a minute, and your site will be live!

---

### Initial Setup Post-Deployment
Once deployed, you need to create your first Admin account. Since the application currently requires an admin token to create projects, you'll need to hit the `/api/admin/register` endpoint initially to create your master admin user.
Use a tool like Postman to send a `POST` request to `YOUR_BACKEND_URL/api/admin/register` with `{"email": "your_email@example.com", "password": "securepassword"}`. Once done, you can delete or secure the register route.

Enjoy your new modern portfolio!
