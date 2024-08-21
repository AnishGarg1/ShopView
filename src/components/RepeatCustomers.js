import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import records from '../TestData/shopifyOrder';

const RepeatCustomers = () => {
  const [timeFrame, setTimeFrame] = useState('daily'); // default to daily

  const groupByTimeFrame = (timeFrame) => {
    const repeatCustomers = {};
    records.forEach(order => {
      const date = new Date(order.created_at);
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

      if (!repeatCustomers[order.email]) repeatCustomers[order.email] = new Set();
      repeatCustomers[order.email].add(key);
    });

    const customerCounts = {};
    Object.values(repeatCustomers).forEach(keysSet => {
      keysSet.forEach(key => {
        if (!customerCounts[key]) customerCounts[key] = 0;
        customerCounts[key] += 1;
      });
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
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div>
        <button onClick={() => setTimeFrame('daily')}>Daily</button>
        <button onClick={() => setTimeFrame('monthly')}>Monthly</button>
        <button onClick={() => setTimeFrame('quarterly')}>Quarterly</button>
        <button onClick={() => setTimeFrame('yearly')}>Yearly</button>
      </div>
      <Bar data={chartData} />
    </div>
  );
};

export default RepeatCustomers;
