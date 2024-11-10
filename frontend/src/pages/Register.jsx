// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { FiUpload } from "react-icons/fi";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            // Crear preview de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('email', email);
            formData.append('role', role);
            if (profileImage) {
                formData.append('profileImage', profileImage);
            }

            console.log('Enviando datos:');
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const response = await register(formData);
            setSuccess("Usuario registrado exitosamente!");
            setError(null);
            navigate('/login');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 
                               err.response?.data?.error || 
                               "Error en el registro. Por favor, intente nuevamente.";
            setError(errorMessage);
            setSuccess(null);
            console.error('Error detallado:', err.response?.data);
        }
    };
    

    return (
        <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleRegister} className="w-full max-w-md p-8 bg-white rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                
                {/* Imagen de perfil */}
                <div className="mb-6 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
                        {previewImage ? (
                            <img 
                                src={previewImage} 
                                alt="Profile preview" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FiUpload size={24} className="text-gray-400" />
                        )}
                    </div>
                    <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        <span>Upload Profile Picture</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Campos existentes */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 p-3 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-3 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-3 border border-gray-300 rounded"
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mb-4 p-3 border border-gray-300 rounded"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                </select>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                <button
                    type="submit"
                    className="w-full p-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition"
                >
                    Register
                </button>
            </form>

            <button
                onClick={() => navigate("/login")}
                className="mt-4 text-blue-500 hover:underline"
            >
                Already have an account? Login
            </button>
        </div>
    );
};

export default Register;