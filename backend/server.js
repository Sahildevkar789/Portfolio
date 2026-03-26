import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import certRoutes from './routes/certRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import contactInfoRoutes from './routes/contactInfoRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import researchRoutes from './routes/researchRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
