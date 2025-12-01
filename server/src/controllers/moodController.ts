// server/src/controllers/moodController.ts
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
// 确保这一行路径正确，引入我们之前写的 AuthRequest 接口
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

// 1. 创建情绪记录
export const createMood = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { moodType, note } = req.body;
    // 从中间件获取的 userId
    const userId = req.userId; 

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found' });
    }

    const newMood = await prisma.moodEntry.create({
      data: {
        moodType,
        note,
        userId: userId,
      },
    });

    res.status(201).json(newMood);
  } catch (error) {
    console.error("Create Mood Error:", error);
    res.status(500).json({ message: 'Failed to create mood entry' });
  }
};

// 2. 获取当前用户的情绪记录
export const getMoods = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'User ID not found' });
    }
    
    // 只查询属于当前 userId 的记录
    const moods = await prisma.moodEntry.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(moods);
  } catch (error) {
    console.error("Get Moods Error:", error);
    res.status(500).json({ message: 'Failed to retrieve moods' });
  }
};