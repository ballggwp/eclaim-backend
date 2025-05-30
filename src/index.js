// src/index.js
const express = require('express');
const env     = require('./config/env');
const authRoutes     = require('./routes/auth');
const formRoutes     = require('./routes/forms');
const errorHandler   = require('./middlewares/errorHandler');
const companiesRoutes = require('./routes/companies');
const factoriesRoutes = require('./routes/factories');
const usersRoutes = require('./routes/users');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// routes
app.use('/api/companies', companiesRoutes)
app.use('/api/factories', factoriesRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/users', usersRoutes);

app.use(
  cors({
    origin: "http://localhost:3000",  // your Next.js dev server
    credentials: true,
  })
);
app.use(express.json());

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
