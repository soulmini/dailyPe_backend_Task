import { PrismaClient } from '@prisma/client';
import { validate } from 'uuid';
import express from 'express';
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { full_name, mob_num, pan_num, manager_id } = req.body;

    if (!full_name) {
        return res.status(400).json({ error: 'Full name is required' });
      }
      // Validate mob_num
      const mobNumRegex = /^[0-9]{10}$/;
      if (!mobNumRegex.test(mob_num)) {
        return res.status(400).json({ error: 'Invalid mobile number' });
      }
    
      // Validate pan_num
      const panNumRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
      if (!panNumRegex.test(pan_num)) {
        return res.status(400).json({ error: 'Invalid PAN number' });
      }

  let managerExists = true;
  let isManagerActive = true;

  // Validate manager_id if present
  if (manager_id) {
    if (!validate(manager_id)) {
      return res.status(400).json({ error: 'Invalid manager ID' });
    }
    // Check if manager exists in the Manager table
    const manager = await prisma.manager.findUnique({
      where: { id: manager_id },
    });
    if (!manager) {
      managerExists = false;
    }
    // Check if manager is active (add isActive field to Manager model)
    if (manager && !manager.active) {
      isManagerActive = false;
    }
  }

  // If manager_id is provided and manager does not exist or is not active, return error
  if (manager_id && (!managerExists || !isManagerActive)) {
    return res.status(400).json({ error: 'Invalid manager ID or manager is not active' });
  }

  try {
    // Insert user data into the database
    const user = await prisma.user.create({
      data: {
        full_name,
        mob_num,
        pan_num: pan_num.toUpperCase(),
        manager_id,
      },
    });

    // Return success message
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


})

export default router;
