// src/routes/auth.js
const Router = require('express').Router;
const authController = require('../controllers/authController');

const router = Router();

// POST /api/auth/register
router.post('/register', authController.registerUser);

// POST /api/auth/login
router.post('/login', authController.loginUser);

module.exports = router;
