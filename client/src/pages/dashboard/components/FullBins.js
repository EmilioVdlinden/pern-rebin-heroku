import { React, useState, useEffect } from 'react';
import { PiTrash } from "react-icons/pi";
import { getFullBins } from '../../../api/StatisticsApi';

const FullBins = ({customerId}) => {

  const [fullBins, setFullBins] = useState(0);

  /*async function getFullBins() {
    try {
      const response = await axios.get(`http://localhost:5000/statistics/sensors/${customerId}/full`);
      setFullBins(response.data.full.count);

    } catch (err) {
      console.log(err);
    }
  }*/

  useEffect(() => {
    getFullBins(customerId).then(
      (response) => {
        setFullBins(response);
    });

    // getFullBins();
  }, [customerId]);

  return (
    <div className='flex items-center justify-between min-w-56 py-4 pl-3 pr-3 text-left shadow-md rounded-lg bg-white'>
      <div className='flex flex-col'>
        <h1 className='block font-bold text-rebin-grey text-xs'>Full bins</h1>
        <span className='block text-rebin-darkblue text-lg font-semibold truncate'>{fullBins}</span>
      </div>
      <div className='p-2 bg-rebin-blue rounded-lg'>
        <PiTrash className='h-5 w-auto text-white'/>
      </div>
    </div>
  )
}

export default FullBins;