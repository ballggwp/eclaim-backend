// src/routes/approvals.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authmiddleware');
const approvalController = require('../controllers/approvalController');

// ทุก endpoint ต้องผ่าน auth ก่อน
router.use(authMiddleware);

// ตัวอย่าง: PUT /api/approvals
// payload: { formId, decision }
router.put('/', approvalController.handleApproval);

module.exports = router;
