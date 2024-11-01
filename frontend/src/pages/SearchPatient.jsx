// src/pages/SearchPatient.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPatients, updatePatientStatus } from "../services/patientService"; // Asegúrate de tener estos métodos en el servicio

const SearchPatient = () => {
    const [patients, setPatients] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        const response = await fetchPatients();
        setPatients(response.data);
    };

    const handleStatusToggle = async (patientId, currentStatus) => {
        const newStatus = currentStatus === "activo" ? "inactivo" : "activo";
        await updatePatientStatus(patientId, newStatus);
        loadPatients();
    };

    const filteredPatients = patients.filter(patient =>
        patient.identification_number.includes(searchId)
    );

    const handleSelectPatient = (id) => {
        setSelectedPatientId(id);
    };

    const handleRegisterData = () => {
        if (selectedPatientId) {
            navigate(`/patient/${selectedPatientId}/add-record`);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Buscar Paciente</h1>
            <input
                type="text"
                placeholder="Número de identificación"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="mb-4 p-2 border rounded w-full max-w-md"
            />

            <table className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
                <thead>
                    <tr className="bg-blue-100 text-blue-700">
                        <th className="p-4">Nombres y apellidos</th>
                        <th className="p-4">Número de identificación</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4">Editar</th>
                        <th className="p-4">Seleccionar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.map((patient) => (
                        <tr key={patient.id} className="border-b">
                            <td className="p-4">{patient.first_name} {patient.last_name}</td>
                            <td className="p-4">{patient.identification_number}</td>
                            <td className="p-4">
                                <button
                                    onClick={() => handleStatusToggle(patient.id, patient.status)}
                                    className={`px-4 py-1 rounded ${
                                        patient.status === "activo" ? "bg-green-500" : "bg-red-500"
                                    } text-white`}
                                >
                                    {patient.status === "activo" ? "Activo" : "Inactivo"}
                                </button>
                            </td>
                            <td className="p-4">
                                <button
                                    onClick={() => console.log(`Edit patient ${patient.id}`)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    &#9998;
                                </button>
                            </td>
                            <td className="p-4">
                                <button
                                    onClick={() => handleSelectPatient(patient.id)}
                                    className={`px-4 py-1 rounded ${
                                        selectedPatientId === patient.id ? "bg-blue-500 text-white" : "bg-gray-300"
                                    }`}
                                >
                                    {selectedPatientId === patient.id ? "Seleccionado" : "Seleccionar"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={handleRegisterData}
                disabled={!selectedPatientId}
                className={`mt-6 px-4 py-2 ${
                    selectedPatientId ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
                } text-white font-bold rounded`}
            >
                Registrar Datos
            </button>
        </div>
    );
};

export default SearchPatient;
