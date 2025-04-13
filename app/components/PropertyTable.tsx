'use client';
import { useState } from 'react';
import { PropertyData } from './DuplicatesChart';

interface PropertyTableProps {
  data: PropertyData[];
}

export default function PropertyTable({ data: propertyData }: PropertyTableProps) {
  const [dateFilter, setDateFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sqftFilter, setSqftFilter] = useState('');

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    try {
      const [day, month, year] = dateStr.split('-');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } catch (error) {
      return '';
    }
  };

  const filteredData = propertyData.filter(item => {
    // Date filter: Compare DD-MM-YYYY to YYYY-MM-DD format
    const matchesDate = !dateFilter || formatDate(item['Transaction Date']) === dateFilter;
    
    // Price filter: Match as you type with null check
    const matchesPrice = !priceFilter || (
      item['Land Price (INR)'] !== undefined && 
      item['Land Price (INR)']?.toString().includes(priceFilter)
    );
    
    // Sqft filter: Match as you type with null check
    const matchesSqft = !sqftFilter || (
      item['Dimensions (sq. ft)'] !== undefined && 
      item['Dimensions (sq. ft)']?.toString().includes(sqftFilter)
    );

    return matchesDate && matchesPrice && matchesSqft;
  });

  return (
    <div className="overflow-x-auto">
      {/* Filters */}
      <div className="p-4 grid grid-cols-3 gap-4 bg-gray-800">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border p-2 rounded"
          placeholder="Filter by price"
        />
        <input
          type="text"
          value={sqftFilter}
          onChange={(e) => setSqftFilter(e.target.value)}
          className="border p-2 rounded"
          placeholder="Filter by sq.ft"
        />
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-4 text-left">Old Owner Name</th>
            <th className="p-4 text-left">Land Price (INR)</th>
            <th className="p-4 text-left">Dimensions (sq. ft)</th>
            <th className="p-4 text-left">New Owner Name</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Transaction Date</th>
          </tr>
        </thead>
        <tbody className='bg-gray-800'>
          {filteredData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">{item['Old Owner Name']}</td>
              <td className="p-4">{item['Land Price (INR)']}</td>
              <td className="p-4">{item['Dimensions (sq. ft)']}</td>
              <td className="p-4">{item['New Owner Name']}</td>
              <td className="p-4">{item.Location}</td>
              <td className="p-4">{item['Transaction Date']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 