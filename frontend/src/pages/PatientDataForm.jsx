// src/pages/PatientDataForm.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPatientRecord } from "../services/patientService";
import { FiSave, FiClipboard } from "react-icons/fi";

const PatientDataForm = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();

    const [recordDate, setRecordDate] = useState("");
    const [recordTime, setRecordTime] = useState("00:00");
    const [adultWeight, setAdultWeight] = useState("");
    const [height, setHeight] = useState("");
    const [systolicPressure, setSystolicPressure] = useState("");
    const [diastolicPressure, setDiastolicPressure] = useState("");
    const [meanArterialPressure, setMeanArterialPressure] = useState("");
    const [pulse, setPulse] = useState("");
    const [respiratoryRate, setRespiratoryRate] = useState("");
    const [oxygenSaturation, setOxygenSaturation] = useState("");
    const [temperature, setTemperature] = useState("");
    const [observations, setObservations] = useState("");

    const calculateMeanArterialPressure = () => {
        if (systolicPressure && diastolicPressure) {
            const tam = ((2 * parseInt(diastolicPressure) + parseInt(systolicPressure)) / 3).toFixed(0);
            setMeanArterialPressure(tam);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPatientRecord({
                patient_id: patientId,
                record_date: recordDate,
                record_time: recordTime,
                systolic_pressure: systolicPressure,
                diastolic_pressure: diastolicPressure,
                mean_arterial_pressure: meanArterialPressure,
                pulse,
                temperature,
                respiratory_rate: respiratoryRate,
                oxygen_saturation: oxygenSaturation,
                adult_weight: adultWeight,
                height,
                observations
            });
            alert("Patient data saved successfully!");
            navigate(`/patient/${patientId}/records`); // Redirige al historial de registros
        } catch (error) {
            console.error("Error saving patient data", error);
            alert("Failed to save patient data.");
        }
    };
    
    

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 overflow-auto">
            <h1 className="text-2xl font-bold mb-6">Monitoreo General</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
                <div className="flex justify-between mb-4">
                    <div className="w-1/2 mr-2">
                        <label>Fecha Dato:</label>
                        <input
                            type="date"
                            value={recordDate}
                            onChange={(e) => setRecordDate(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="w-1/2 ml-2">
                        <label>Hora Dato:</label>
                        <input
                            type="time"
                            value={recordTime}
                            onChange={(e) => setRecordTime(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label>Peso Adulto (kg):</label>
                        <input
                            type="number"
                            value={adultWeight}
                            onChange={(e) => setAdultWeight(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label>Talla (cm):</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label>Pulso (lat x min):</label>
                        <input
                            type="number"
                            value={pulse}
                            onChange={(e) => setPulse(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label>Frecuencia Respiratoria (resp x min):</label>
                        <input
                            type="number"
                            value={respiratoryRate}
                            onChange={(e) => setRespiratoryRate(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label>SatO2%:</label>
                        <input
                            type="number"
                            value={oxygenSaturation}
                            onChange={(e) => setOxygenSaturation(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label>Temperatura (°C):</label>
                        <input
                            type="number"
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label>TAD (mm Hg):</label>
                        <input
                            type="number"
                            value={diastolicPressure}
                            onChange={(e) => {
                                setDiastolicPressure(e.target.value);
                                calculateMeanArterialPressure();
                            }}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label>TAS (mm Hg):</label>
                        <input
                            type="number"
                            value={systolicPressure}
                            onChange={(e) => {
                                setSystolicPressure(e.target.value);
                                calculateMeanArterialPressure();
                            }}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label>TAM (mm Hg):</label>
                        <input
                            type="text"
                            value={meanArterialPressure}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label>Observaciones:</label>
                    <textarea
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        maxLength="100"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
                    >
                        <FiSave className="mr-2" />
                        Guardar Datos
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/patient/${patientId}/records`)}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
                    >
                        <FiClipboard className="mr-2" />
                        Ver registros anteriores
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientDataForm;
