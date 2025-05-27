// src/controllers/approvalController.js
const approvalService = require('../services/approvalService');

exports.handleApproval = async (req, res, next) => {
  try {
    const { formId, decision } = req.body;
    const approverId = req.user.id;
    // บริการจะจัดการเปลี่ยนสถานะ, บันทึก History ฯลฯ
    const result = await approvalService.processApproval({ formId, approverId, decision });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
