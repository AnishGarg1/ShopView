import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const CustomerLifetimeValue = () => {
  const { customers } = useSelector((state) => state.shopify);
  const { orders } = useSelector((state) => state.shopify);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const cohortData = {};

    // Calculate lifetime value for each customer and group by cohort
    customers.forEach((customer) => {
      const firstPurchaseMonth = customer.created_at.slice(0, 7); // YYYY-MM

      // Filter orders for the current customer
      const customerOrders = orders.filter(
        (order) => order.email === customer.email
      );

      // Calculate total lifetime value for the customer
      const lifetimeValue = customerOrders.reduce((total, order) => {
        return total + parseFloat(order.total_price);
      }, 0);

      // Aggregate lifetime value for each cohort
      if (!cohortData[firstPurchaseMonth]) {
        cohortData[firstPurchaseMonth] = 0;
      }
      cohortData[firstPurchaseMonth] += lifetimeValue;
    });

    const labels = Object.keys(cohortData).sort(); // Sort labels chronologically
    const data = labels.map(label => cohortData[label]);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Customer Lifetime Value by Cohort',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.4)',
          borderColor: 'rgba(75, 192, 192, 0.8)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    });
  }, [customers, orders]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
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
          text: 'Cohort (YYYY-MM)',
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
          text: 'Lifetime Value (INR)',
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  if (!chartData) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Lifetime Value by Cohort</h2>
      <div className="h-[500px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CustomerLifetimeValue;
