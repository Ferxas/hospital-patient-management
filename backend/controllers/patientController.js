// controllers/patientController.js
const db = require('../config/db');

exports.getPatients = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM patients");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Error fetching patients" });
    }
};

exports.registerPatient = async (req, res) => {
    const { first_name, last_name, identification_number, birth_date, document_type, location, status } = req.body;

    // Calcular si el paciente es pediátrico en base a la fecha de nacimiento
    const birth = new Date(birth_date);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    const is_pediatric = age < 14;

    try {
        await db.query(
            "INSERT INTO patients (first_name, last_name, identification_number, birth_date, document_type, location, status, is_pediatric) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [first_name, last_name, identification_number, birth_date, document_type, location, status || 'activo', is_pediatric]
        );
        res.status(201).json({ message: "Patient registered successfully" });
    } catch (error) {
        console.error("Error registering patient:", error);
        res.status(500).json({ message: "Error registering patient" });
    }
};

exports.updatePatientStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await db.query("UPDATE patients SET status = ? WHERE id = ?", [status, id]);
        res.json({ message: "Patient status updated successfully" });
    } catch (error) {
        console.error("Error updating patient status:", error);
        res.status(500).json({ message: "Error updating patient status" });
    }
};

exports.getPatientInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const [patient] = await db.query("SELECT * FROM patients WHERE id = ?", [id]);
        if (patient.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(patient[0]);
    } catch (error) {
        console.error("Error fetching patient info:", error);
        res.status(500).json({ message: "Error fetching patient info" });
    }
};
