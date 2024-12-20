// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const patientRoutes = require('./routes/patientRoutes');
const patientRecordRoutes = require('./routes/patientRecordRoutes');


const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);  // Rutas de autenticación
app.use('/api/users', userRoutes); // Rutas de gestión de usuarios
app.use('/api/patients', patientRoutes); // rutas de gestion de pacientes
app.use('/api/patient-records', patientRecordRoutes); // rutas de gestion de registro de pacientes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
