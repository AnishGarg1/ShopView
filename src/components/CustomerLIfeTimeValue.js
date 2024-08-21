import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import customerData from '../TestData/shopifyCustomer';
import orderData from '../TestData/shopifyOrder';

const CustomerLifetimeValue = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const cohortData = {};

    // Calculate lifetime value for each customer and group by cohort
    customerData.forEach((customer) => {
      const cohort = customer.created_at.slice(0, 7); // YYYY-MM
      console.log(`Customer: ${customer.email}, Cohort: ${cohort}`);

      // Filter orders for the current customer
      const customerOrders = orderData.filter(
        (order) => order.email === customer.email
      );
      console.log(`Orders for ${customer.email}: `, customerOrders);

      // Calculate total lifetime value for the customer
      const lifetimeValue = customerOrders.reduce((total, order) => {
        return total + parseFloat(order.total_price);
      }, 0);

      console.log(`Lifetime Value for ${customer.email}: ${lifetimeValue}`);

      // Aggregate lifetime value for each cohort
      if (!cohortData[cohort]) {
        cohortData[cohort] = 0;
      }
      cohortData[cohort] += lifetimeValue;
    });

    console.log('Cohort Data: ', cohortData);

    const labels = Object.keys(cohortData);
    const data = Object.values(cohortData);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Customer Lifetime Value by Cohort',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Lifetime Value (INR)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Cohort (YYYY-MM)',
        },
      },
    },
  };

  if (!chartData) {
    return <p>Loading...</p>;
  }

  return <Bar data={chartData} options={options} />;
};

export default CustomerLifetimeValue;
