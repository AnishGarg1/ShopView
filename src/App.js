import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCustomers, setOrders, setProducts } from './redux/shopifySlice';
import './App.css';

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import NewCustomersOverTime from './components/NewCustomerOverTime';
import SalesGrowthRate from './components/SalesGrowthRate';
import TotalSalesOverTime from './components/TotalSalesOverTime';
import RepeatCustomers from './components/RepeatCustomers';
import CustomerDistribution from './components/CustomerDistribution';
import CustomerLifetimeValue from './components/CustomerLIfeTimeValue';
import Modal from './components/Modal';

// Register the components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/customers`);
        const ordersResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders`);
        const productsResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`);

        dispatch(setCustomers(customersResponse.data.customers));
        dispatch(setOrders(ordersResponse.data.orders));
        dispatch(setProducts(productsResponse.data.products));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const openModal = (component) => {
    setModalContent(component);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="App bg-gray-100 min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">ShopView</h1>
      </header>
      <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow-md rounded-lg p-6">
          <button 
            onClick={() => openModal(<TotalSalesOverTime />)}
            className="text-teal-500 hover:text-teal-700 font-semibold"
          >
            View Total Sales Over Time
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <button 
            onClick={() => openModal(<SalesGrowthRate />)}
            className="text-teal-500 hover:text-teal-700 font-semibold"
          >
            View Sales Growth Rate
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <button 
            onClick={() => openModal(<NewCustomersOverTime />)}
            className="text-teal-500 hover:text-teal-700 font-semibold"
          >
            View New Customers Over Time
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <button 
            onClick={() => openModal(<RepeatCustomers />)}
            className="text-teal-500 hover:text-teal-700 font-semibold"
          >
            View Repeat Customers
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <button 
            onClick={() => openModal(<CustomerDistribution />)}
            className="text-teal-500 hover:text-teal-700 font-semibold"
          >
            View Customer Distribution
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <button 
            onClick={() => openModal(<CustomerLifetimeValue />)}
            className="text-teal-500 hover:text-teal-700 font-semibold"
          >
            View Customer Lifetime Value
          </button>
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default App;
