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
    const { first_name, last_name, identification_number, age, document_type, location, status } = req.body;

    try {
        await db.query(
            "INSERT INTO patients (first_name, last_name, identification_number, age, document_type, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [first_name, last_name, identification_number, age, document_type, location, status || 'activo']
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
