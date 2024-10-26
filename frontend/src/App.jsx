// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import PatientRegister from './pages/PatientRegister';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/reset-password/:token" element={<ChangePassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register-patient" element={<PatientRegister />} />
                <Route path="/admin-panel" element={<AdminPanel />} />

                {/* Add more routes as needed */}
                {/* Default route */}
                <Route path="*" element={<h1>404 Page Not Found</h1>} />

            </Routes>
        </Router>
    );
}

export default App;
