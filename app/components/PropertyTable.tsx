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
      console.log(error);
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
      <div className="p-4 grid grid-cols-3 gap-4 bg-gray-800 sticky top-0 z-10">
        <div>
          <label className="block text-white text-sm mb-1">Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full border p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-white text-sm mb-1">Price</label>
          <input
            type="text"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full border p-2 rounded bg-gray-700 text-white"
            placeholder="Filter by price"
          />
        </div>
        <div>
          <label className="block text-white text-sm mb-1">Square Feet</label>
          <input
            type="text"
            value={sqftFilter}
            onChange={(e) => setSqftFilter(e.target.value)}
            className="w-full border p-2 rounded bg-gray-700 text-white"
            placeholder="Filter by sq.ft"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-white whitespace-nowrap">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-4 text-left font-medium">Old Owner</th>
              <th className="p-4 text-left font-medium">New Owner</th>
              <th className="p-4 text-left font-medium">Price (INR)</th>
              <th className="p-4 text-left font-medium">Sq.ft</th>
              <th className="p-4 text-left font-medium">Location</th>
              <th className="p-4 text-left font-medium">Date</th>
              <th className="p-4 text-left font-medium">Property ID</th>
              <th className="p-4 text-left font-medium min-w-[400px]">
                Transaction Hash
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            {filteredData.map((item, index) => (
              <tr key={index} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="p-4">{item['Old Owner Name']}</td>
                <td className="p-4">{item['New Owner Name']}</td>
                <td className="p-4">{item['Land Price (INR)']}</td>
                <td className="p-4">{item['Dimensions (sq. ft)']}</td>
                <td className="p-4">{item.Location}</td>
                <td className="p-4">{item['Transaction Date']}</td>
                <td className="p-4">{item['property id']}</td>
                <td className="p-4 min-w-[400px]">
                  {item.Transaction_Hash}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 