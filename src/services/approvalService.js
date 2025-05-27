// src/services/approvalService.js
const prisma = require('../models');

exports.processApproval = async ({ formId, approverId, decision }) => {
  // TODO: โหลดฟอร์ม, ตรวจสอบลำดับ approver, อัปเดต status, สร้าง record ใน Approval model
  return { message: 'processApproval ยังไม่ implement' };
};
