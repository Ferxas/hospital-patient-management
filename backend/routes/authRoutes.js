// routes/authRoutes.js
const express = require('express');
const { login, resetPassword, updatePassword, register } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login); // ruta para login
router.post('/reset-password', resetPassword); // ruta para reset password
router.post('/register', register);  // Ruta para el registro

router.patch('/reset-password/:token', updatePassword);

module.exports = router;