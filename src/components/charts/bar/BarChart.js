import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Vaccinations 2021',
                data: [90452, 93230, 93478, 99267, 99532],
                borderColor: ['rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            },
            {
                label: 'Hospitalisations 2021',
                data: [15629, 15935, 12367, 9354, 17926],
                borderColor: ['rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            }
        ]
    }
    const options = {
        title: {
            display: true,
            text: 'Covid Exploration',
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 100000,
                        stepSize: 1
                    }
                }

            ]
        }
    }
    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart;
