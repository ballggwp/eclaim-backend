// eclaim-backend/src/routes/companies.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    // raw SQL against your lookup table
    const rows = await prisma.$queryRaw`
      SELECT id, name, address
      FROM "Company"   -- or "Company" if that’s your exact table name
    `;
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
