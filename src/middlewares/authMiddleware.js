// src/middlewares/authMiddleware.js
const jwt    = require('jsonwebtoken');
const env    = require('../config/env');
const prisma = require('../models');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await prisma.user.findUnique({
      where: { userId: decoded.userId }
    });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = { id: user.userId, role: user.role };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
