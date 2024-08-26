import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const NewCustomersOverTime = () => {
  const records = useSelector((state) => state.shopify.customers);
  const [interval, setInterval] = useState('daily');

  // Function to group data based on the selected interval
  const groupData = (interval) => {
    const groupedData = {};
    records.forEach(customer => {
      const date = new Date(customer.created_at);
      let key;

      switch (interval) {
        case 'daily':
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          break;
        case 'quarterly':
          const quarter = Math.ceil((date.getMonth() + 1) / 3);
          key = `${date.getFullYear()}-Q${quarter}`;
          break;
        case 'yearly':
          key = `${date.getFullYear()}`;
          break;
        default:
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      if (!groupedData[key]) groupedData[key] = 0;
      groupedData[key] += 1;
    });

    return groupedData;
  };

  const groupedData = groupData(interval);

  const labels = Object.keys(groupedData);
  const data = Object.values(groupedData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'New Customers',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#333',
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Time Interval',
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          borderColor: '#ddd',
        },
        ticks: {
          color: '#333',
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Number of New Customers',
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">New Customers Over Time</h2>
      <div className="mb-4 flex space-x-4">
        <button 
          onClick={() => setInterval('daily')} 
          className={`px-4 py-2 rounded-lg ${interval === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}
        >
          Daily
        </button>
        <button 
          onClick={() => setInterval('monthly')} 
          className={`px-4 py-2 rounded-lg ${interval === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}
        >
          Monthly
        </button>
        <button 
          onClick={() => setInterval('quarterly')} 
          className={`px-4 py-2 rounded-lg ${interval === 'quarterly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}
        >
          Quarterly
        </button>
        <button 
          onClick={() => setInterval('yearly')} 
          className={`px-4 py-2 rounded-lg ${interval === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}
        >
          Yearly
        </button>
      </div>
      <div className="h-[500px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default NewCustomersOverTime;
