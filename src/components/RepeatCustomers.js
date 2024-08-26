import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const RepeatCustomers = () => {
  const records = useSelector((state) => state.shopify.orders);
  const [timeFrame, setTimeFrame] = useState('daily'); // default to daily

  const groupByTimeFrame = (timeFrame) => {
    const repeatCustomers = {};

    records.forEach(order => {
      const date = new Date(order.created_at);
      const customerEmail = order.email;
      let key;

      switch (timeFrame) {
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
        case 'daily':
        default:
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          break;
      }

      if (!repeatCustomers[customerEmail]) {
        repeatCustomers[customerEmail] = new Set();
      }
      repeatCustomers[customerEmail].add(key);
    });

    // Count customers with more than one purchase in the same time frame
    const customerCounts = {};
    Object.values(repeatCustomers).forEach(keysSet => {
      if (keysSet.size > 1) {
        keysSet.forEach(key => {
          if (!customerCounts[key]) customerCounts[key] = 0;
          customerCounts[key] += 1;
        });
      }
    });

    return customerCounts;
  };

  const customerCounts = groupByTimeFrame(timeFrame);
  const labels = Object.keys(customerCounts);
  const data = Object.values(customerCounts);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Repeat Customers',
        data: data,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
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
          text: 'Time Frame',
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
          text: 'Number of Repeat Customers',
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Repeat Customers</h2>
      <div className="mb-4 flex space-x-4">
        <button 
          onClick={() => setTimeFrame('daily')} 
          className={`px-4 py-2 rounded-lg ${timeFrame === 'daily' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}
        >
          Daily
        </button>
        <button 
          onClick={() => setTimeFrame('monthly')} 
          className={`px-4 py-2 rounded-lg ${timeFrame === 'monthly' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}
        >
          Monthly
        </button>
        <button 
          onClick={() => setTimeFrame('quarterly')} 
          className={`px-4 py-2 rounded-lg ${timeFrame === 'quarterly' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}
        >
          Quarterly
        </button>
        <button 
          onClick={() => setTimeFrame('yearly')} 
          className={`px-4 py-2 rounded-lg ${timeFrame === 'yearly' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} transition-colors duration-200`}
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

export default RepeatCustomers;
