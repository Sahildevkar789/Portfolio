import express from 'express';
import Education from '../models/Education.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/education
// @desc    Get all education records
router.get('/', async (req, res) => {
    try {
        const educations = await Education.find().sort({ createdAt: -1 });
        res.json(educations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/education
// @desc    Add new education record
router.post('/', protect, admin, async (req, res) => {
    try {
        const newEdu = new Education(req.body);
        const savedEdu = await newEdu.save();
        res.status(201).json(savedEdu);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// @route   PUT /api/education/:id
// @desc    Update education record
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const updatedEdu = await Education.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEdu) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Updated', updatedEdu });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
});

// @route   DELETE /api/education/:id
// @desc    Delete education record
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const deletedEdu = await Education.findByIdAndDelete(req.params.id);
        if (!deletedEdu) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
