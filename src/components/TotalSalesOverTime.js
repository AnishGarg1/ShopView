import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import records from '../TestData/shopifyOrder';
import groupDataByInterval from '../utils/groupByInterval';

const TotalSalesOverTime = () => {
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

export default TotalSalesOverTime;
