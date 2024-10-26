// src/pages/PatientRegister.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPatient } from "../services/patientService";

const PatientRegister = () => {
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [systolicPressure, setSystolicPressure] = useState("");
    const [diastolicPressure, setDiastolicPressure] = useState("");
    const [meanArterialPressure, setMeanArterialPressure] = useState("");
    const [pulse, setPulse] = useState("");
    const [temperature, setTemperature] = useState("");
    const [respiratoryRate, setRespiratoryRate] = useState("");
    const [oxygenSaturation, setOxygenSaturation] = useState("");
    const [adultWeight, setAdultWeight] = useState("");
    const [pediatricWeight, setPediatricWeight] = useState("");
    const [height, setHeight] = useState("");
    const [observations, setObservations] = useState("");
    const [isPediatric, setIsPediatric] = useState(false);

    const calculateMeanArterialPressure = () => {
        if (systolicPressure && diastolicPressure) {
            const tam = ((2 * parseInt(diastolicPressure) + parseInt(systolicPressure)) / 3).toFixed(0);
            setMeanArterialPressure(tam);
        }
    };

    const handleSystolicChange = (e) => {
        setSystolicPressure(e.target.value);
        calculateMeanArterialPressure();
    };

    const handleDiastolicChange = (e) => {
        setDiastolicPressure(e.target.value);
        calculateMeanArterialPressure();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerPatient({
                date,
                time,
                systolicPressure,
                diastolicPressure,
                meanArterialPressure,
                pulse,
                temperature,
                respiratoryRate,
                oxygenSaturation,
                adultWeight,
                pediatricWeight: isPediatric ? pediatricWeight : null,
                height,
                observations
            });
            alert("Patient registered successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error registering patient", error);
            alert("Failed to register patient.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 overflow-auto">
            <h1 className="text-2xl font-bold mb-6">Register New Patient</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Systolic Pressure (mmHg)</label>
                    <input
                        type="number"
                        value={systolicPressure}
                        onChange={handleSystolicChange}
                        max="999"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Diastolic Pressure (mmHg)</label>
                    <input
                        type="number"
                        value={diastolicPressure}
                        onChange={handleDiastolicChange}
                        max="999"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Mean Arterial Pressure (mmHg)</label>
                    <input
                        type="text"
                        value={meanArterialPressure}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label>Pulse (bpm)</label>
                    <input
                        type="number"
                        value={pulse}
                        onChange={(e) => setPulse(e.target.value)}
                        max="999"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Temperature (°C)</label>
                    <input
                        type="text"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        pattern="\d{2}\.\d"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Respiratory Rate (per minute)</label>
                    <input
                        type="number"
                        value={respiratoryRate}
                        onChange={(e) => setRespiratoryRate(e.target.value)}
                        max="999"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Oxygen Saturation (SatO2%)</label>
                    <input
                        type="number"
                        value={oxygenSaturation}
                        onChange={(e) => setOxygenSaturation(e.target.value)}
                        max="999"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Adult Weight (kg)</label>
                    <input
                        type="text"
                        value={adultWeight}
                        onChange={(e) => setAdultWeight(e.target.value)}
                        pattern="\d{3}\.\d{3}"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>
                        <input
                            type="checkbox"
                            checked={isPediatric}
                            onChange={(e) => setIsPediatric(e.target.checked)}
                        />
                        Pediatric Population (up to 14 years)
                    </label>
                    {isPediatric && (
                        <input
                            type="text"
                            placeholder="Pediatric Weight (g/kg)"
                            value={pediatricWeight}
                            onChange={(e) => setPediatricWeight(e.target.value)}
                            pattern="\d{2}\.\d"
                            className="w-full p-2 border rounded mt-2"
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label>Height (cm)</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        max="999"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Observations</label>
                    <textarea
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        maxLength="100"
                        className="w-full p-2 border rounded"
                        placeholder="Additional notes"
                    />
                </div>
                <button type="submit" className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition">
                    Register Patient
                </button>
            </form>
        </div>
    );
};

export default PatientRegister;
