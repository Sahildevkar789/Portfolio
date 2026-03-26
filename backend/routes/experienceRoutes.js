import express from 'express';
import Experience from '../models/Experience.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/experience  — public
router.get('/', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/experience  — admin only
router.post('/', protect, admin, async (req, res) => {
    try {
        const exp = new Experience(req.body);
        const saved = await exp.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// PUT /api/experience/:id  — admin only
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const updated = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// DELETE /api/experience/:id  — admin only
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const deleted = await Experience.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
