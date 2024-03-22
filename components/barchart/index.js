import React from 'react';
import stlyes from "./styles.module.scss"
import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    const { acousticness, dancebility, energy, instumental, liveness, speechiness, valence } = data
    const [options, setOptions] = useState()
    const [chartdata, setChartData] = useState({
        datasets: []
    })


    useEffect(() => {
        setOptions(
            {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Audio Features',
                    },
                },
                borderWidth: 1,
            }
        )
        setChartData({
            labels: [" acousticness", "dancebility", "energy", "instumental", "liveness", "speechiness", "valence"],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [acousticness, dancebility, energy, instumental, liveness, speechiness, valence],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                },
            ]
        })
    }, [])




    return (
        <div className={stlyes.barchart}>
            <Bar data={chartdata} options={options} />
        </div>
    );
}

export default BarChart;