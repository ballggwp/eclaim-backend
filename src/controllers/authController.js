const prisma = require('../models');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const env    = require('../config/env');

exports.registerUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash, name }
    });
    res.status(201).json({ userId: user.userId, email: user.email, name: user.name });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      env.jwtSecret,
      { expiresIn: '8h' }
    );
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
