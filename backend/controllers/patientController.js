// controllers/patientController.js
const db = require('../config/db');

exports.registerPatient = async (req, res) => {
    const {
        date, time, systolicPressure, diastolicPressure,
        meanArterialPressure, pulse, temperature, respiratoryRate,
        oxygenSaturation, adultWeight, pediatricWeight, height, observations
    } = req.body;

    try {
        await db.query("INSERT INTO patients (date, time, systolicPressure, diastolicPressure, meanArterialPressure, pulse, temperature, respiratoryRate, oxygenSaturation, adultWeight, pediatricWeight, height, observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [date, time, systolicPressure, diastolicPressure, meanArterialPressure, pulse, temperature, respiratoryRate, oxygenSaturation, adultWeight, pediatricWeight, height, observations]
        );
        res.status(201).json({ message: "Patient registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering patient" });
    }
};
