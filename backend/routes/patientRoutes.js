// routes/patientRoutes.js
const express = require('express');
const { registerPatient } = require('../controllers/patientController');
const router = express.Router();

router.post('/', registerPatient); // Ruta para registrar un paciente

module.exports = router;