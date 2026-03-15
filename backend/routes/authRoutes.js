import express from 'express';
import { authUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser); // Useful for initial setup

export default router;
