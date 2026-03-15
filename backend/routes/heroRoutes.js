import express from 'express';
import { getHero, updateHero } from '../controllers/heroController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getHero)
    .put(protect, admin, updateHero);

export default router;
