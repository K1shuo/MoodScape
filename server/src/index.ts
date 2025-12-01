// server/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
// 👇 1. 引入情绪路由
import moodRoutes from './routes/moodRoutes'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 挂载路由
app.use('/api/auth', authRoutes);
// 👇 2. 启用情绪路由 (这一行就是解决 404 的关键！)
app.use('/api/moods', moodRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('MoodScape API is running successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});