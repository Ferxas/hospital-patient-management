// controllers/patientRecordController.js
const db = require('../config/db');

exports.createPatientRecord = async (req, res) => {
    const {
        patient_id, record_date, record_time, systolic_pressure, diastolic_pressure, mean_arterial_pressure,
        pulse, temperature, respiratory_rate, oxygen_saturation, adult_weight, pediatric_weight, height, observations
    } = req.body;

    try {
        await db.query(
            "INSERT INTO patient_records (patient_id, record_date, record_time, systolic_pressure, diastolic_pressure, mean_arterial_pressure, pulse, temperature, respiratory_rate, oxygen_saturation, adult_weight, pediatric_weight, height, observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, record_date, record_time, systolic_pressure, diastolic_pressure, mean_arterial_pressure, pulse, temperature, respiratory_rate, oxygen_saturation, adult_weight, pediatric_weight, height, observations]
        );
        res.status(201).json({ message: "Patient record created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating patient record" });
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
