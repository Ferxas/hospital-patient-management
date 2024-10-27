// routes/patientRoutes.js
const express = require('express');
const { getPatients, registerPatient, updatePatientStatus } = require('../controllers/patientController');
const router = express.Router();

router.get('/', getPatients); // Obtener todos los pacientes
router.post('/', registerPatient); // Registrar un nuevo paciente
router.patch('/:id', updatePatientStatus); // Actualizar el estado del paciente

module.exports = router;
