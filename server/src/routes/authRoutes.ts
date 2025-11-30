// server/src/routes/authRoutes.ts
import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

// 定义路径
router.post('/register', register);
router.post('/login', login);

export default router;