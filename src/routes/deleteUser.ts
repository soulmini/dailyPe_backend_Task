import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express';
const router = express.Router();

router.delete('/', async (req: Request, res: Response) => {
    const { user_id, mob_num } = req.body;
    try {
      let user;
      // If user_id is provided, retrieve user by user_id
      if (user_id) {
        user = await prisma.user.findUnique({
          where: { id: user_id },
        });
      }
      // If mob_num is provided, retrieve user by mob_num
      else if (mob_num) {
        user = await prisma.user.findUnique({
          where: { mob_num },
        });
      }
  
      // If user record exists, delete it
      if (user) {
        await prisma.user.delete({
          where: { id: user.id },
        });
        res.json({ message: 'User deleted successfully' });
      } else {
        // If user record does not exist, return error message
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }}
);

export default router;
