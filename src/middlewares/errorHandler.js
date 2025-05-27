// src/middlewares/errorHandler.js

module.exports = (err, req, res, next) => {
  console.error(err);  // log error ที่ server console
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
};
