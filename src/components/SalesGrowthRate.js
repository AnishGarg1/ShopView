import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import records from '../TestData/shopifyOrder';

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
    const growthRate = ((current - previous) / previous) * 100;
    growthRates.push(growthRate);
  }

  return { labels: keys.slice(1), growthRates };
};

const SalesGrowthRate = () => {
  const [interval, setInterval] = useState('daily');
  const { labels, growthRates } = calculateGrowthRate(records, interval);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sales Growth Rate',
        data: growthRates,
        fill: false,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
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
      <Line data={chartData} />
    </div>
  );
};

export default SalesGrowthRate;
