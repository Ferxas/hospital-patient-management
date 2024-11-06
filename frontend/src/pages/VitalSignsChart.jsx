// src/pages/VitalSignsChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const VitalSignsChart = ({ records }) => {
    const getLabels = () => records.map(record => record.record_date);

    const createDataset = (label, dataKey, color) => ({
        label,
        data: records.map(record => record[dataKey]),
        borderColor: color,
        backgroundColor: color,
        tension: 0.2,
        fill: false,
    });

    const data = {
        labels: getLabels(),
        datasets: [
            createDataset('Pulso (lpm)', 'pulse', 'rgb(255, 99, 132)'),
            createDataset('Temperatura (°C)', 'temperature', 'rgb(54, 162, 235)'),
            createDataset('Frecuencia Respiratoria (resp/min)', 'respiratory_rate', 'rgb(75, 192, 192)'),
            createDataset('TAS (mmHg)', 'systolic_pressure', 'rgb(153, 102, 255)'),
            createDataset('TAD (mmHg)', 'diastolic_pressure', 'rgb(255, 159, 64)'),
            createDataset('SatO2 (%)', 'oxygen_saturation', 'rgb(201, 203, 207)'),
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Signos Vitales del Paciente' },
        },
        scales: {
            x: { title: { display: true, text: 'Fecha' } },
            y: { title: { display: true, text: 'Valor' }, beginAtZero: true },
        },
    };

    return <Line data={data} options={options} />;
};

export default VitalSignsChart;