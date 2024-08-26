import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import groupDataByInterval from '../utils/groupByInterval';
import { useSelector } from 'react-redux';

const TotalSalesOverTime = () => {
  const records = useSelector((state) => state.shopify.orders);
  const [interval, setInterval] = useState('daily');

  const groupedData = groupDataByInterval(records, interval);
  const labels = Object.keys(groupedData);
  const data = Object.values(groupedData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Sales',
        data: data,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Total Sales Over Time</h2>
      <div className="mb-4 flex space-x-4">
        <button 
          onClick={() => setInterval('daily')} 
          className={`px-4 py-2 rounded-lg ${interval === 'daily' ? 'bg-teal-500 text-white' : 'bg-teal-200 text-teal-700'} transition-colors duration-200`}
        >
          Daily
        </button>
        <button 
          onClick={() => setInterval('monthly')} 
          className={`px-4 py-2 rounded-lg ${interval === 'monthly' ? 'bg-teal-500 text-white' : 'bg-teal-200 text-teal-700'} transition-colors duration-200`}
        >
          Monthly
        </button>
        <button 
          onClick={() => setInterval('quarterly')} 
          className={`px-4 py-2 rounded-lg ${interval === 'quarterly' ? 'bg-teal-500 text-white' : 'bg-teal-200 text-teal-700'} transition-colors duration-200`}
        >
          Quarterly
        </button>
        <button 
          onClick={() => setInterval('yearly')} 
          className={`px-4 py-2 rounded-lg ${interval === 'yearly' ? 'bg-teal-500 text-white' : 'bg-teal-200 text-teal-700'} transition-colors duration-200`}
        >
          Yearly
        </button>
      </div>
      <div className="h-[500px]">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default TotalSalesOverTime;
