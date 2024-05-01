import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import express from 'express';
const router = express.Router();

const prisma = new PrismaClient();

router.post('/', async (req: Request, res: Response) => {
  const { user_ids, update_data } = req.body;

  try {
    if (!user_ids || !update_data) {
      return res.status(400).json({ error: 'Missing user_ids or update_data in request body' });
    }

    if (Array.isArray(update_data)) {
      // Bulk update with only manager_id
      const managerIds = update_data.map(obj => String(Object.values(obj)[0])); // Convert manager IDs to strings
      // Update managers
      const updatedManagers = await prisma.manager.updateMany({
        where: {
          id: {
            in: managerIds as string[],
          },
        },
        data: {
          active: true,
          updated_at: new Date(),
        },
      });
      if (updatedManagers.count !== managerIds.length) {
        return res.status(400).json({ error: 'Not all manager IDs were found' });
      }
      // Update users
      const updatedUsers = await prisma.user.updateMany({
        where: {
          id: {
            in: user_ids as string[],
          },
        },
        data: {
          manager_id: {
            // @ts-ignore
            in: managerIds as string[],
          },
          updated_at: new Date(),
        },
      });
      if (updatedUsers.count !== user_ids.length) {
        return res.status(400).json({ error: 'Not all user IDs were found' });
      }
    } else {
      // Handle individual updates
      
      for (const user_id of user_ids) {
        const userData = update_data[user_id];
        if (!userData) {
          return res.status(400).json({ error: `No update data found for user with ID ${user_id}` });
        }
        // Validate manager_id if provided
        if (userData.manager_id !== undefined) {
          const managerExists = await prisma.manager.findUnique({
            where: { id: userData.manager_id },
          });
          if (!managerExists) {
            return res.status(400).json({ error: `Manager with ID ${userData.manager_id} does not exist` });
          }
          // If user already has a manager, mark the current entry as inactive
          const user = await prisma.user.findUnique({ where: { id: user_id } });
          if (user && user.manager_id) {
            await prisma.manager.update({
              where: { id: user.manager_id },
              data: { active: false, updated_at: new Date() },
            });
          }
        }
        // Update user with new data
        await prisma.user.update({
          where: { id: user_id },
          data: {
            full_name: userData.full_name,
            mob_num: userData.mob_num,
            pan_num: userData.pan_num,
            manager_id: userData.manager_id,
            updated_at: new Date(),
          },
        });
      }
    }

    res.json({ message: 'Users updated successfully' });
  } catch (error) {
    console.error('Error updating users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
