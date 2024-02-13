import { React, useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import blue from '../../../assets/blueEllips.svg';
import darkBlue from '../../../assets/darkBlueEllips.svg';
import red from '../../../assets/redEllipse.svg';
import { getSensors } from '../../../api/StatisticsApi';
import { getBinDistribution } from '../../../api/StatisticsApi';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  responsive: true,
  circumference: 180,
  rotation: -90,
  cutout: 56,
  elements: {
    arc: {
      borderWidth: 2
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 1)",
      usePointStyle: true,
      boxPadding: 4,
      titleFont: {
        size: 16,
      },
      bodyFont: {
        size: 16,
      }
    }
  }
};

const BinDistribution = ({customerId}) => {

  const [binDistribution, setBinDistribution] = useState([]);
  const [totalBins, setTotalBins] = useState(0);

  /*async function getBinDistribution() {
    try {
      
      const response = await axios.get(`http://localhost:5000/statistics/sensors/${customerId}/distribution`);
      console.log(response.data);
      setBinDistribution(response.data);

    } catch (err) {
      console.log(err);
    }
  }

  async function getTotalBins() {
    try {
      const response = await axios.get(`http://localhost:5000/statistics/sensors/${customerId}`);
      setTotalBins(response.data.sensors.count);

    } catch (err) {
      console.log(err);
    }
  }*/

  useEffect(() => {
    getBinDistribution(customerId).then(
      (response) => {
        setBinDistribution(response);
    });

    getSensors(customerId).then(
      (response) => {
        setTotalBins(response);
    });

  }, [customerId]);

  const data = {
    labels: ['< 50%', '50% - 75%', '> 75%'],
    datasets: [
      {
        data: binDistribution,
        backgroundColor: ['#0043FF', '#12274F', '#D80027'],
        hoverBackgroundColor: ['#0043FF', '#12274F', '#D80027'],
      },
    ],
  };

  return (
    <div className='rounded-lg bg-white py-4 pl-3 pr-3 text-left shadow-md' style={{ gridRow: "span 2" }}>
      <h1 className='block font-bold text-rebin-grey text-xs'>Bin distribution</h1>
        <div className='mt-3 mx-4'>
          <Doughnut className='z-10' data={data} options={options} />
        </div>
        <div className="flex flex-col justify-center items-center relative -top-16">
          <div className='font-semibold text-base'>Total amount</div>
          <div className='font-medium text-xl'>{totalBins}</div>
        </div>
      <div className='flex justify-center -mt-8 gap-x-4'>
        <div className='flex items-center gap-x-2 text-xs'>
          <img src={blue}  className='w-3' />
          <span>{'<50%'}</span>
        </div>
        <div className='flex items-center gap-x-2 text-xs'>
          <img src={darkBlue}  className='w-3' />
          <span>{'50-75%'}</span>
        </div>
        <div className='flex items-center gap-x-2 text-xs'>
          <img src={red}  className='w-3' />
          <span>{'>75%'}</span>
        </div>
      </div>

    </div>
  )
}

export default BinDistribution;