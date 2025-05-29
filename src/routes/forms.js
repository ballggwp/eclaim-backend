const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authmiddleware');  // ← good
const { createForm, getFormsByCreator } = require('../controllers/formController');

router.use(authMiddleware);
router.post('/', createForm);
router.get('/', getFormsByCreator);

module.exports = router;