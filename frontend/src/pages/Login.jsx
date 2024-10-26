// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            localStorage.setItem("token", response.data.token); // Guardar el token
            localStorage.setItem("role", response.data.role);   // Guardar el rol del usuario
            navigate("/dashboard"); // Redirigir al panel general
        } catch (err) {
            setError("Failed to login. Please check your credentials.");
        }
    };

    return (
        <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-white rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 p-3 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-3 border border-gray-300 rounded"
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;