// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(localStorage.getItem("role") || "");

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login"); // Redirigir al login si no hay token
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
            
            {/* Botón para ir al panel de administración, solo visible para administradores */}
            {role === "admin" && (
                <button
                    onClick={() => navigate("/admin-panel")}
                    className="px-4 py-2 bg-red-500 text-white rounded mb-4"
                >
                    Go to Admin Panel
                </button>
            )}

            {/* Botón para registrar un nuevo paciente, accesible para todos los roles */}
            <button
                onClick={() => navigate("/register-patient")}
                className="px-4 py-2 bg-green-500 text-white rounded mb-4"
            >
                Register New Patient
            </button>

            {/* Botón para cerrar sesión */}
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    navigate("/login");
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;