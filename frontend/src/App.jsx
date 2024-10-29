// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import PatientRegister from './pages/PatientRegister';
import PatientRecordForm from './pages/PatientRecordForm';
import SearchPatient from './pages/SearchPatient';
import PatientDataForm from './pages/PatientDataForm';
import PatientRecordHistory from './pages/PatientRecordHistory';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> {/* ruta de registro temporalmente para facilitar la creación del admin */}
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/reset-password/:token" element={<ChangePassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register-patient" element={<PatientRegister />} />
                {/* <Route path='/patient/:patientId/add-record' element={<PatientRecordForm />} /> */}
                <Route path="/patient/:patientId/add-record" element={<PatientDataForm />} />´
                <Route path="/patient/:patientId/records" element={<PatientRecordHistory />} />
                <Route path="/search-patient" element={<SearchPatient />} />
                <Route path="/admin-panel" element={<AdminPanel />} />

                {/* Default route */}
                <Route path="*" element={<h1>404 Page Not Found</h1>} />

            </Routes>
        </Router>
    );
}

export default App;
