import express from 'express';
import Feedback from '../models/Feedback.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/feedback
// @desc    Submit feedback/bug report
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { type, email, message } = req.body;
        if (!type || !message) {
            return res.status(400).json({ message: 'Type and message are required' });
        }
        const feedback = new Feedback({ type, email, message });
        const createdFeedback = await feedback.save();
        res.status(201).json(createdFeedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/feedback
// @desc    Get all feedback/bug reports
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
