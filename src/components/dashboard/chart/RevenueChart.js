import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './RevenueChart.css'; // This CSS file will contain the styles for your component
// Register the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: false,
  plugins: {
    legend: {
      display: false, // Set to true if you want to display legend
    },
    title: {
      text: 'Monthly Revenue',
      color : '#4e73df',
      padding: {
        right: 30,
      },
      margin: {
        left: 30,
      },
      display: true, // Set to true to include a chart title
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      display:true,
    },
  },
};

const RevenueChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: data.map(d => d.value),
        backgroundColor: data.map(d => d.color),
        borderColor: data.map(d => d.color),
        borderWidth: 1,
      },
    ],
  };

  return <div className='container-chart'><Bar options={options} data={chartData} /></div>
  
};

export default RevenueChart;
