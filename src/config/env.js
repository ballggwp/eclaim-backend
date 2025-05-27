// src/config/env.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret:   process.env.JWT_SECRET,
};