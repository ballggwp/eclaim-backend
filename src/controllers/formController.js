// src/controllers/formController.js
const formService = require('../services/formService');

exports.createForm = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware
    const form = await formService.createForm(req.user.id, req.body);
    res.status(201).json(form);
  } catch (err) {
    next(err);
  }
};

exports.getFormsByCreator = async (req, res, next) => {
  try {
    const forms = await formService.getFormsByCreator(req.user.id);
    res.json(forms);
  } catch (err) {
    next(err);
  }
};
