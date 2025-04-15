'use client';
import { useState } from 'react';
import Papa from 'papaparse';
import StatsCard from './components/StatsCard';
import DuplicatesChart from './components/DuplicatesChart';
import PropertiesChart from './components/PropertiesChart';
import PropertyTable from './components/PropertyTable';

interface PropertyData {
  'Old Owner Name': string;
  'Land Price (INR)': number;
  'Dimensions (sq. ft)': number;
  'New Owner Name': string;
  Location: string;
  'Transaction Date': string;
  Transaction_Hash: string;
  'property id': number;
}

export default function Home() {
  const [data, setData] = useState<PropertyData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data as PropertyData[]);
          setIsLoading(false);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          setIsLoading(false);
        }
      });
    }
  };

  // Calculate stats
  const oldOwners = new Set(data.map(item => item['Old Owner Name'])).size;
  const newOwners = new Set(data.map(item => item['New Owner Name'])).size;
  const totalProperties = data.length;

  return (
    <div className="p-6 space-y-6">
      {/* Upload Section */}
      <section className="text-center p-8 bg-gray-800 rounded-lg shadow">
        <label className="block mb-4 text-white">Upload your CSV file</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block mx-auto p-2 text-white
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-500 file:text-white
            hover:file:bg-blue-600"
        />
      </section>

      {isLoading ? (
        <div className="text-center p-4">Loading...</div>
      ) : data.length > 0 ? (
        <>
          {/* Dashboard Section */}
          <section className="grid grid-cols-3 gap-4">
            <StatsCard title="Old Owners" value={oldOwners} />
            <StatsCard title="New Owners" value={newOwners} />
            <StatsCard title="Total Properties" value={totalProperties} />
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <DuplicatesChart data={data} />
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <PropertiesChart data={data} />
            </div>
          </section>

          {/* Users Table Section */}
          <section className="bg-white rounded-lg shadow">
            <PropertyTable data={data} />
          </section>
        </>
      ) : (
        <div className="text-center p-4 text-gray-500">
          Upload a CSV file to view the dashboard
        </div>
      )}
    </div>
  );
}
