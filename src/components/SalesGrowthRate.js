import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const calculateGrowthRate = (records, interval) => {
  const groupedData = {};

  records.forEach(order => {
    const date = new Date(order.created_at);
    let key;
    
    switch (interval) {
      case 'daily':
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        break;
      case 'monthly':
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        break;
      case 'quarterly':
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        key = `${date.getFullYear()}-Q${quarter}`;
        break;
      case 'yearly':
        key = `${date.getFullYear()}`;
        break;
      default:
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    if (!groupedData[key]) groupedData[key] = 0;
    groupedData[key] += parseFloat(order.total_price);
  });

  const keys = Object.keys(groupedData);
  const values = Object.values(groupedData);
  const growthRates = [];
  
  for (let i = 1; i < values.length; i++) {
    const previous = values[i - 1];
    const current = values[i];
    
    if (previous !== 0) {
      const growthRate = ((current - previous) / previous) * 100;
      growthRates.push(growthRate.toFixed(2)); // Round to 2 decimal places
    } else {
      growthRates.push(null);  // Or handle it differently, e.g., push 0 or skip this rate.
    }
  }

  return { labels: keys.slice(1), growthRates };
};

const SalesGrowthRate = () => {
  const records = useSelector((state) => state.shopify.orders);

  const [interval, setInterval] = useState('daily');
  const { labels, growthRates } = calculateGrowthRate(records, interval);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sales Growth Rate (%)',
        data: growthRates,
        fill: false,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        // Add percentage symbol to the tooltip
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.parsed.y !== null
                ? `${context.parsed.y}%`
                : 'No data';
            }
          }
        }
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.raw !== null
              ? `Growth Rate: ${context.raw}%`
              : 'No data';
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return `${value}%`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sales Growth Rate</h2>
      <div className="mb-4 flex space-x-4">
        <button 
          onClick={() => setInterval('daily')} 
          className={`px-4 py-2 rounded-lg ${interval === 'daily' ? 'bg-indigo-500 text-white' : 'bg-indigo-200 text-indigo-700'} transition-colors duration-200`}
        >
          Daily
        </button>
        <button 
          onClick={() => setInterval('monthly')} 
          className={`px-4 py-2 rounded-lg ${interval === 'monthly' ? 'bg-indigo-500 text-white' : 'bg-indigo-200 text-indigo-700'} transition-colors duration-200`}
        >
          Monthly
        </button>
        <button 
          onClick={() => setInterval('quarterly')} 
          className={`px-4 py-2 rounded-lg ${interval === 'quarterly' ? 'bg-indigo-500 text-white' : 'bg-indigo-200 text-indigo-700'} transition-colors duration-200`}
        >
          Quarterly
        </button>
        <button 
          onClick={() => setInterval('yearly')} 
          className={`px-4 py-2 rounded-lg ${interval === 'yearly' ? 'bg-indigo-500 text-white' : 'bg-indigo-200 text-indigo-700'} transition-colors duration-200`}
        >
          Yearly
        </button>
      </div>
      <div className="h-[500px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SalesGrowthRate;
