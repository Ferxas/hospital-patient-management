// src/pages/VitalSignsChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const VitalSignsChart = ({ records, selectedVariables }) => {
    const getLabels = () => records.map(record => record.record_date);

    const createDataset = (label, dataKey, color) => ({
        label,
        data: records.map(record => record[dataKey]),
        borderColor: color,
        backgroundColor: color,
        tension: 0.2,
        fill: false,
    });

    const colors = {
        pulse: 'rgb(255, 99, 132)',
        temperature: 'rgb(54, 162, 235)',
        respiratory_rate: 'rgb(75, 192, 192)',
        systolic_pressure: 'rgb(153, 102, 255)',
        diastolic_pressure: 'rgb(255, 159, 64)',
        oxygen_saturation: 'rgb(201, 203, 207)',
    };

    const data = {
        labels: getLabels(),
        datasets: selectedVariables.map(variable =>
            createDataset(variable, variable, colors[variable])
        ),
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