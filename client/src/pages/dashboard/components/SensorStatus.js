import React from 'react';
import { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { getSensors } from '../../../api/StatisticsApi';

const SensorStatus = ({customerId}) => {

  const [numberSensors, setNumberSensors] = useState(0);

  /*async function getSensors() {
    try {
      const response = await axios.get(`http://localhost:5000/statistics/sensors/${customerId}`);
      setNumberSensors(response.data.sensors.count);

    } catch (err) {
      console.log(err);
    }
  }
  */

  useEffect(() => {
    getSensors(customerId).then(
      (response) => {
        setNumberSensors(response);
      });

      //getSensors();

  },[customerId]);


  return (
    <div className='flex items-center justify-between min-w-56 py-4 pl-3 pr-3 text-left shadow-md rounded-lg bg-white'>
      <div className='flex flex-col'>
        <h1 className='block font-bold text-rebin-grey text-xs'>Sensor status</h1>
        <span className='block text-rebin-darkblue text-lg font-semibold truncate'>{numberSensors > 1 ? `${numberSensors} sensors` : `${numberSensors} sensor`}</span>
      </div>
      <div className='p-2 bg-rebin-blue rounded-lg'>
        <FaCheck className='h-5 w-auto text-white'/>
      </div>
    </div>
  )
}

export default SensorStatus;