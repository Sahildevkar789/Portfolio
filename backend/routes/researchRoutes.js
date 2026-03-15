import express from 'express';
import Research from '../models/Research.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/research
// @desc    Get research data
// @access  Public
router.get('/', async (req, res) => {
    try {
        const research = await Research.findOne();
        if (research) {
            res.json(research);
        } else {
            res.status(404).json({ message: 'Research data not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/research
// @desc    Update research data
// @access  Private/Admin
router.put('/', protect, admin, async (req, res) => {
    try {
        let research = await Research.findOne();

        if (research) {
            research.title = req.body.title || research.title;
            research.author = req.body.author || research.author;
            research.abstract = req.body.abstract || research.abstract;
            if (req.body.keywords) {
                research.keywords = Array.isArray(req.body.keywords) 
                    ? req.body.keywords 
                    : req.body.keywords.split(',').map(k => k.trim());
            }
            research.paperLink = req.body.paperLink || research.paperLink;
            research.pdfLink = req.body.pdfLink || research.pdfLink;
            research.githubLink = req.body.githubLink || research.githubLink;
            research.citation = req.body.citation || research.citation;

            const updatedResearch = await research.save();
            res.json(updatedResearch);
        } else {
            // Create initial if none exists
            research = new Research(req.body);
            const createdResearch = await research.save();
            res.status(201).json(createdResearch);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
