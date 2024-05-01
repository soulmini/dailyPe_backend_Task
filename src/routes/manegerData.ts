import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import express from 'express';
const router = express.Router();

const prisma = new PrismaClient();

router.post('/', async (req: Request, res: Response) => {
  const managerData = req.body;
  try {
    // Create managers in bulk with the provided data
    const createdManagers = await prisma.manager.createMany({
      data: managerData.map((data: any) => ({
        id: String(data.id),
        active: data.active,
      })),
    });

    res.status(201).json({ message: 'Managers created successfully', managers: createdManagers });
  } catch (error) {
    console.error('Error creating managers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
