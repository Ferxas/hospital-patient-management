// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import PatientRegister from './pages/PatientRegister';
// import PatientRecordForm from './pages/PatientRecordForm';
import SearchPatient from './pages/SearchPatient';
import PatientDataForm from './pages/PatientDataForm';
import PatientRecordHistory from './pages/PatientRecordHistory';
import PatientGraphs from './pages/PatientGraphs';
import Layout from './components/Layout';



function App() {
    return (
        <Router>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password/:token" element={<ChangePassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/register-patient" element={<Layout><PatientRegister /></Layout>} />
                <Route path="/patient/:patientId/add-record" element={<Layout><PatientDataForm /></Layout>} />
                <Route path="/patient/:patientId/records" element={<Layout><PatientRecordHistory /></Layout>} />
                <Route path="/patient/:patientId/graphs" element={<Layout><PatientGraphs /></Layout>} />
                <Route path="/search-patient" element={<Layout><SearchPatient /></Layout>} />
                <Route path="/admin-panel" element={<Layout><AdminPanel /></Layout>} />

                <Route path="*" element={<h1>404 Page Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
