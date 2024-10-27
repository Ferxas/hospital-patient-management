// src/pages/PatientRegister.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPatient } from "../services/patientService";

const PatientRegister = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [identificationNumber, setIdentificationNumber] = useState("");
    const [age, setAge] = useState("");
    const [documentType, setDocumentType] = useState("cédula de ciudadanía");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("activo");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerPatient({
                first_name: firstName,
                last_name: lastName,
                identification_number: identificationNumber,
                age,
                document_type: documentType,
                location,
                status
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
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Identification Number</label>
                    <input
                        type="text"
                        value={identificationNumber}
                        onChange={(e) => setIdentificationNumber(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Document Type</label>
                    <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="cédula de ciudadanía">Cédula de Ciudadanía</option>
                        <option value="tarjeta de identidad">Tarjeta de Identidad</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label>Location (Room)</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>
                <button type="submit" className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition">
                    Register Patient
                </button>
            </form>
        </div>
    );
};

export default PatientRegister;
