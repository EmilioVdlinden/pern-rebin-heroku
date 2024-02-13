import {React, useState, useEffect} from 'react';
import { getCustomerId } from '../../api/DashboardApi';
import Navbar from '../../components/Navbar';
import DropDown from './components/DropDown'
import FullBins from './components/FullBins';
import SensorStatus from './components/SensorStatus';
import CollectionMoment from './components/CollectionMoment';
import Measurements from './components/Measurements';
import BinDistribution from './components/BinDistribution';
import DriverOverview from './components/DriverOverview';


const Dashboard = ({ setIsAuthenticated }) => {
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    getCustomerId().then(response => {
      setCustomerId(response);
    });
  }, []);

  // Render components only when customerId is available
  return customerId ? (
    <div className='flex bg-rebin-light-blue'>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <div className='p-12 w-screen'>
        <h1 className='text-4xl font-medium text-rebin-darkblue'>Dashboard</h1>
        <div className='grid grid-cols-4 gap-x-5 gap-y-5 mt-8' style={{ gridAutoRows: 'minmax(80px, auto)' }}>
          <DropDown />
          <FullBins customerId={customerId} />
          <SensorStatus customerId={customerId} />
          <CollectionMoment />
          <Measurements customerId={customerId} />
          <BinDistribution customerId={customerId} />
          <DriverOverview />
        </div>
      </div>
    </div>
  ) : null; // Render nothing if customerId is not available
};

export default Dashboard;