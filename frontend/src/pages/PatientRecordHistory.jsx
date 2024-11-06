import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPatientRecords } from "../services/patientService";
import { FiPlusCircle, FiHome, FiFilter, FiDownload } from "react-icons/fi";
import { format } from "date-fns";
import VitalSignsChart from "./VitalSignsChart";

const PatientRecordHistory = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [patientInfo, setPatientInfo] = useState({});
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedVariables, setSelectedVariables] = useState(["pulse", "temperature", "respiratory_rate", "systolic_pressure", "diastolic_pressure", "oxygen_saturation"]);

    const tableRef = useRef(null); // Referencia para la tabla
    const chartRef = useRef(null); // Referencia para el gráfico

    useEffect(() => {
        loadPatientRecords();
    }, []);

    const loadPatientRecords = async () => {
        try {
            const response = await fetchPatientRecords(patientId);
            setRecords(response.data.records);
            setFilteredRecords(response.data.records);
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

    const handleFilter = () => {
        const filtered = records.filter(record => {
            const recordDate = new Date(record.record_date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;
            return (!start || recordDate >= start) && (!end || recordDate <= end);
        });

        const filteredWithVariables = filtered.map(record => {
            const filteredRecord = {};
            selectedVariables.forEach(variable => {
                filteredRecord[variable] = record[variable];
            });
            return { ...record, ...filteredRecord };
        });

        setFilteredRecords(filteredWithVariables);
    };

    const toggleVariable = (variable) => {
        setSelectedVariables(prev => 
            prev.includes(variable) 
                ? prev.filter(v => v !== variable)
                : [...prev, variable]
        );
    };

    const handleExportPDF = async () => {
        const pdf = new jsPDF("p", "mm", "a4");

        // Captura de la tabla
        if (tableRef.current) {
            const tableCanvas = await html2canvas(tableRef.current);
            const tableImage = tableCanvas.toDataURL("image/png");
            pdf.addImage(tableImage, "PNG", 10, 10, 190, 0);
        }

        // Captura del gráfico
        if (chartRef.current) {
            const chartCanvas = await html2canvas(chartRef.current);
            const chartImage = chartCanvas.toDataURL("image/png");
            pdf.addPage();
            pdf.addImage(chartImage, "PNG", 10, 10, 190, 0);
        }

        pdf.save("Patient_Record_History.pdf");
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 overflow-auto">
            <h1 className="text-2xl font-bold mb-6">Registro del Paciente</h1>
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl mb-6 overflow-x-auto" ref={tableRef}>
                {/* Información del paciente */}
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

                {/* Filtros */}
                <div className="mb-4">
                    <div className="flex items-center mb-4">
                        <label className="mr-2">Fecha de inicio:</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded" />
                        <label className="mx-2">Fecha de fin:</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded" />
                        <button onClick={handleFilter} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center">
                            <FiFilter className="mr-2" /> Filtrar
                        </button>
                    </div>

                    <div>
                        <h3 className="font-bold">Variables:</h3>
                        <div className="flex space-x-4">
                            {["pulse", "temperature", "respiratory_rate", "systolic_pressure", "diastolic_pressure", "oxygen_saturation"].map(variable => (
                                <label key={variable} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedVariables.includes(variable)}
                                        onChange={() => toggleVariable(variable)}
                                        className="mr-2"
                                    />
                                    {variable}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabla de Registros Filtrados */}
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
                        {filteredRecords.map((record, index) => (
                            <tr key={index} className="text-center">
                                <td className="p-2 border">{format(new Date(record.record_date), "dd/MM/yyyy")}</td>
                                <td className="p-2 border">{record.record_time}</td>
                                <td className="p-2 border">{record.pulse}</td>
                                <td className="p-2 border">{record.temperature}</td>
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

            {/* Gráfico de Signos Vitales */}
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl mb-6" ref={chartRef}>
                <h3 className="font-bold mb-4">Gráfico de Signos Vitales</h3>
                <VitalSignsChart records={filteredRecords} selectedVariables={selectedVariables} />
            </div>

            {/* Botones de acción */}
            <div className="flex justify-between w-full max-w-4xl">
                <button onClick={handleNewRecord} className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition">
                    <FiPlusCircle className="mr-2" /> Nuevo registro
                </button>
                <button onClick={handleExportPDF} className="flex items-center px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition">
                    <FiDownload className="mr-2" /> Exportar como PDF
                </button>
                <button onClick={handleGoBack} className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition">
                    <FiHome className="mr-2" /> Regresar
                </button>
            </div>
        </div>
    );
};

export default PatientRecordHistory;
