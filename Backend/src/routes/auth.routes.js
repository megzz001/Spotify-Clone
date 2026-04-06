const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const { registerUserValidationRules } = require('../middlewares/validation.middleware');

router.post('/register', registerUserValidationRules, authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);

module.exports = router;