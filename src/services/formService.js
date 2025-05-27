// src/services/formService.js
const prisma = require('../models');

exports.createForm = (creatorId, data) => {
  return prisma.insuranceForm.create({
    data: {
      creatorId,
      ...data,
      status: 'PENDING_APPROVE_1'
    }
  });
};

exports.getFormsByCreator = (creatorId) => {
  return prisma.insuranceForm.findMany({
    where: { creatorId },
    orderBy: { createdDate: 'desc' }
  });
};
