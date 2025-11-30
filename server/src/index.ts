// server/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes'; // 1. 导入路由

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 2. 挂载路由：所有 /api/auth 开头的请求都交给 authRoutes 处理
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('MoodScape API is running successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});