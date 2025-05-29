// src/routes/users.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// GET /api/v1/users
router.get('/', async (_req, res) => {
  try {
    // return only the fields your front end needs
    const users = await prisma.user.findMany({
      select: {
        userId: true,
        name: true,
        role: true
      }
    });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Could not fetch users' });
  }
});

module.exports = router;
