import express from 'express';
import { getContactInfo, updateContactInfo } from '../controllers/contactInfoController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getContactInfo)
    .put(protect, admin, updateContactInfo);

export default router;
