import './App.css';

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import NewCustomersOverTime from './components/NewCustomerOverTime';
import SalesGrowthRate from './components/SalesGrowthRate';
import TotalSalesOverTime from './components/TotalSalesOverTime';
import RepeatCustomers from './components/RepeatCustomers';
import CustomerDistribution from './components/CustomerDistribution';
import CustomerLifetimeValue from './components/CustomerLIfeTimeValue';

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
  return (
    <div className="App">
      <h1>ShopView</h1>
      <TotalSalesOverTime/>
      <SalesGrowthRate/>
      <NewCustomersOverTime/>
      <RepeatCustomers/>
      <CustomerDistribution/>
      <CustomerLifetimeValue/>
    </div>
  );
}

export default App;
