import express from 'express';
import Research from '../models/Research.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/research
// @desc    Get research data
// @access  Public
router.get('/', async (req, res) => {
    try {
        let research = await Research.findOne();
        if (!research) {
            research = await Research.create({});
        }
        res.json(research);
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

        const { title, author, abstract, keywords, paperLink, pdfLink, githubLink, citation, year, domain, impact } = req.body;

        let processedKeywords = undefined;
        if (keywords !== undefined) {
            if (Array.isArray(keywords)) {
                processedKeywords = keywords;
            } else if (typeof keywords === 'string') {
                processedKeywords = keywords.split(',').map(k => k.trim()).filter(Boolean);
            }
        }

        if (research) {
            if (title !== undefined) research.title = title;
            if (author !== undefined) research.author = author;
            if (abstract !== undefined) research.abstract = abstract;
            if (processedKeywords !== undefined) research.keywords = processedKeywords;
            if (paperLink !== undefined) research.paperLink = paperLink;
            if (pdfLink !== undefined) research.pdfLink = pdfLink;
            if (githubLink !== undefined) research.githubLink = githubLink;
            if (citation !== undefined) research.citation = citation;
            if (year !== undefined) research.year = year;
            if (domain !== undefined) research.domain = domain;
            if (impact !== undefined) research.impact = impact;

            const updatedResearch = await research.save();
            return res.json(updatedResearch);
        } else {
            const createdResearch = await Research.create({
                title, author, abstract, 
                keywords: processedKeywords || [], 
                paperLink, pdfLink, githubLink, citation, year, domain, impact
            });
            return res.status(201).json(createdResearch);
        }
    } catch (error) {
        console.error('Error updating research:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
