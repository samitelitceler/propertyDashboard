'use client';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

export interface PropertyData {
    'Old Owner Name': string;
    'Land Price (INR)': number;
    'Dimensions (sq. ft)': number;
    'New Owner Name': string;
    Location: string;
    'Transaction Date': string;
    Transaction_Hash: string;
    'property id': number;
  }

ChartJS.register(ArcElement, Tooltip, Legend);


interface DuplicatesChartProps {
  data: PropertyData[];
}

export default function DuplicatesChart({ data: propertyData }: DuplicatesChartProps) {
  const uniqueCount = new Set(propertyData.map(item => item['property id'])).size;
  const totalCount = propertyData.length;
  const duplicateCount = totalCount - uniqueCount;

  const chartData = {
    labels: ['Unique', 'Duplicates'],
    datasets: [{
      data: [uniqueCount, duplicateCount],
      backgroundColor: ['#36A2EB', '#FF6384']
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    }
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
} 