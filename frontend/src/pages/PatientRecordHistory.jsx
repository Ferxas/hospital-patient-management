// src/pages/PatientRecordHistory.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPatientRecords } from "../services/patientService";
import { FiPlusCircle, FiHome } from "react-icons/fi";
import { format } from "date-fns"; // Importamos `format` de `date-fns`

const PatientRecordHistory = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [patientInfo, setPatientInfo] = useState({});

    useEffect(() => {
        loadPatientRecords();
    }, []);

    const loadPatientRecords = async () => {
        try {
            const response = await fetchPatientRecords(patientId);
            setRecords(response.data.records);
            setPatientInfo(response.data.patient);
        } catch (error) {
            console.error("Error fetching patient records", error);
        }
    };

    const handleNewRecord = () => {
        navigate(`/patient/${patientId}/add-record`);
    };

    const handleGoBack = () => {
        navigate("/dashboard");
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 overflow-auto">
            <h1 className="text-2xl font-bold mb-6">Registro del Paciente</h1>
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl mb-6 overflow-x-auto">
                <div className="flex justify-between mb-4">
                    <div>
                        <p><strong>CC:</strong> {patientInfo.identification_number}</p>
                        <p><strong>Nombre:</strong> {patientInfo.first_name} {patientInfo.last_name}</p>
                        <p><strong>Ubicación:</strong> {patientInfo.location}</p>
                    </div>
                    <span className={`font-bold ${patientInfo.status === "activo" ? "text-green-500" : "text-red-500"}`}>
                        Paciente {patientInfo.status === "activo" ? "Activo" : "Inactivo"}
                    </span>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="p-2 border">Fecha</th>
                            <th className="p-2 border">Hora</th>
                            <th className="p-2 border">Pulso (lpm)</th>
                            <th className="p-2 border">T°C</th>
                            <th className="p-2 border">FR (RPM)</th>
                            <th className="p-2 border">TAS (mmHg)</th>
                            <th className="p-2 border">TAD (mmHg)</th>
                            <th className="p-2 border">TAM (mmHg)</th>
                            <th className="p-2 border">SatO2 (%)</th>
                            <th className="p-2 border">Peso (kg)</th>
                            <th className="p-2 border">Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={index} className="text-center">
                                <td className="p-2 border">{format(new Date(record.record_date), "dd/MM/yyyy")}</td>
                                <td className="p-2 border">{record.record_time}</td>
                                <td className={`p-2 border ${record.pulse > 100 ? "bg-red-200" : ""}`}>{record.pulse}</td>
                                <td className={`p-2 border ${record.temperature > 37 ? "bg-red-200" : ""}`}>{record.temperature}</td>
                                <td className="p-2 border">{record.respiratory_rate}</td>
                                <td className="p-2 border">{record.systolic_pressure}</td>
                                <td className="p-2 border">{record.diastolic_pressure}</td>
                                <td className="p-2 border">{record.mean_arterial_pressure}</td>
                                <td className="p-2 border">{record.oxygen_saturation}</td>
                                <td className="p-2 border">{record.adult_weight}</td>
                                <td className="p-2 border">{record.observations || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between w-full max-w-4xl">
                <button
                    onClick={handleNewRecord}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
                >
                    <FiPlusCircle className="mr-2" />
                    Nuevo registro
                </button>
                <button
                    onClick={handleGoBack}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
                >
                    <FiHome className="mr-2" />
                    Regresar
                </button>
            </div>
        </div>
    );
};

export default PatientRecordHistory;
