'use client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { PropertyData } from './DuplicatesChart';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PropertiesChartProps {
  data: PropertyData[];
}

export default function PropertiesChart({ data: propertyData }: PropertiesChartProps) {
  const monthlyData = propertyData.reduce((acc, item) => {
    const month = new Date(item['Transaction Date']).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, Array(12).fill(0));

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Properties by Month',
      data: monthlyData,
      backgroundColor: '#36A2EB'
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Properties by Month'
      }
    }
  };

  return <Bar options={options} data={chartData} />;
} 