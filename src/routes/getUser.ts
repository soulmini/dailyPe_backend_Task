import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUsers = async (req: Request, res: Response) => {
  const { mob_num, user_id, manager_id } = req.body;

  try {
    let users;

    // If mob_num is provided, retrieve user by mob_num
    if (mob_num) {
      const user = await prisma.user.findUnique({
        where: { mob_num },
      });
      users = user ? [user] : [];
    }
    // If user_id is provided, retrieve user by user_id
    else if (user_id) {
      const user = await prisma.user.findUnique({
        where: { id: user_id },
      });
      users = user ? [user] : [];
    }
    // If manager_id is provided, retrieve users with that manager
    else if (manager_id) {
      users = await prisma.user.findMany({
        where: { manager_id },
      });
    }
    // If no criteria provided, retrieve all users
    else {
      users = await prisma.user.findMany();
    }

    // Return users
    res.json({ users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getUsers };
