import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import records from '../TestData/shopifyCustomer';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register necessary components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NewCustomersOverTime = () => {
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
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div>
        <button onClick={() => setInterval('daily')}>Daily</button>
        <button onClick={() => setInterval('monthly')}>Monthly</button>
        <button onClick={() => setInterval('quarterly')}>Quarterly</button>
        <button onClick={() => setInterval('yearly')}>Yearly</button>
      </div>
      <Bar data={chartData} />
    </div>
  );
};

export default NewCustomersOverTime;
