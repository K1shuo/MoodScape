import { Router } from 'express';
import { createMood, getMoods } from '../controllers/moodController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createMood);
router.get('/', authenticateToken, getMoods);

export default router;