// src/services/patientService.js
import axios from 'axios';

const API_URL = "http://localhost:5000/api";

// Función para registrar un nuevo paciente
export const registerPatient = async (patientData) => {
    return await axios.post(`${API_URL}/patients`, patientData);
};
