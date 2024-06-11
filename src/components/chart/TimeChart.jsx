
import React from 'react';
import { Bar } from 'react-chartjs-2';

const TimeChart = ({ data }) => {
    // Check if data is undefined or null
    if (!data || !data.labels || !data.datasets) {
        return <div>No data available</div>;
    }

    const chartData = {
        labels: data.labels,
        datasets: data.datasets.map((dataset, index) => ({
            label: dataset.label || `Dataset ${index + 1}`,
            data: dataset.data || [],
            backgroundColor: dataset.backgroundColor || 'rgba(0, 0, 0, 0.5)',
            barThickness: dataset.barThickness || 20,
        })),
    };

    const chartOptions = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'User Activity',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <div className='overflow-x-scroll w-[1200px]'>
            <h2>Horizontal Stacked Bar Chart</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default TimeChart;
