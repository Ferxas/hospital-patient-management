// controllers/patientRecordController.js
const db = require('../config/db');

exports.createPatientRecord = async (req, res) => {
    const {
        patient_id, record_date, record_time, systolic_pressure, diastolic_pressure, mean_arterial_pressure,
        pulse, temperature, respiratory_rate, oxygen_saturation, adult_weight, pediatric_weight, height, observations
    } = req.body;

    // Validaciones de los valores de los datos de entrada
    if (height > 250) {
        return res.status(400).json({ message: "Height exceeds realistic maximum value" });
    }
    if (pulse > 200 || pulse < 30) {
        return res.status(400).json({ message: "Pulse value out of range" });
    }
    if (respiratory_rate > 100) {
        return res.status(400).json({ message: "Respiratory rate too high" });
    }
    if (oxygen_saturation > 100) {
        return res.status(400).json({ message: "Oxygen saturation cannot exceed 100%" });
    }

    try {
        // Insertar el nuevo registro en la tabla `patient_records`
        await db.query(
            "INSERT INTO patient_records (patient_id, record_date, record_time, systolic_pressure, diastolic_pressure, mean_arterial_pressure, pulse, temperature, respiratory_rate, oxygen_saturation, adult_weight, pediatric_weight, height, observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, record_date, record_time, systolic_pressure, diastolic_pressure, mean_arterial_pressure, pulse, temperature, respiratory_rate, oxygen_saturation, adult_weight, pediatric_weight, height, observations]
        );

        res.status(201).json({ message: "Patient record created successfully and temperature updated" });
    } catch (error) {
        console.error("Error creating patient record:", error);
        res.status(500).json({ message: "Error creating patient record", error: error.message });
    }
};

exports.getPatientRecords = async (req, res) => {
    const { patientId } = req.params;

    try {
        // Obtener información del paciente
        const [patient] = await db.query("SELECT * FROM patients WHERE id = ?", [patientId]);

        // Obtener registros del paciente
        const [records] = await db.query("SELECT * FROM patient_records WHERE patient_id = ?", [patientId]);

        res.json({ patient: patient[0], records });
    } catch (error) {
        console.error("Error fetching patient records:", error);
        res.status(500).json({ message: "Error fetching patient records" });
    }
};
