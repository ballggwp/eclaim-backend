// eclaim-backend/src/routes/factories.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await prisma.insuranceForm.findMany({
  distinct: ['factory'],
  select: { factory: true, address: true },
  where:    { company: String(req.query.company) }
});
const factories = rows.map(r => ({
  id:      r.factory,
  name:    r.factory,
  address: r.address
}));
  } catch (err) {
    console.error('Error in /api/factories:', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
