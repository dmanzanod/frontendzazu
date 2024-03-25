import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChartDataComponent = ({ data }) => {
  // Assuming data is an array of objects with 'label' and 'value' properties
  const sortedData = data.slice().sort((a, b) => b.value - a.value); // Sort data in descending order

  const chartData = {
    labels: sortedData.map(item => item.label),
    datasets: [
      {
        label: 'Data',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: sortedData.map(item => item.value),
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChartDataComponent;
