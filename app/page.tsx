'use client';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/DATASET_with_property_IDs.csv');
      const reader = response.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result?.value);
      const parsed = Papa.parse(csv, { header: true });
      setData(parsed.data as PropertyData[]);
    };

    fetchData();
  }, []);

  // Calculate stats
  const oldOwners = new Set(data.map(item => item['Old Owner Name'])).size;
  const newOwners = new Set(data.map(item => item['New Owner Name'])).size;
  const totalProperties = data.length;

  return (
    <div className="p-6 space-y-6">
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
    </div>
  );
}
