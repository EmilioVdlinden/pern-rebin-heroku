import React from 'react';
import { FaUserCircle } from "react-icons/fa";


const DriverOverview = () => {
  return (
    <div className='rounded-lg bg-white py-4 pl-3 pr-3 text-left shadow-md' style={{ gridRow: "span 3" }}>
      <h1 className='block font-bold text-rebin-grey text-xs'>Available drivers</h1>
      <div className='flex flex-col py-7 h-full justify-between'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-2'>
            <FaUserCircle className='text-rebin-grey text-xl'></FaUserCircle>
            <span className='text-sm'>Brahim Diallo</span>
          </div>
          <span className='p-1 font-semibold text-xs text-rebin-red rounded-lg bg-rebin-red'>ON ROUTE </span>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-2'>
            <FaUserCircle className='text-rebin-grey text-xl'></FaUserCircle>
            <span className='text-sm'>Piere Dubois</span>
          </div>
          <span className='p-1 font-semibold text-xs text-rebin-green rounded-lg bg-rebin-green'>AVAILABLE</span>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-2'>
            <FaUserCircle className='text-rebin-grey text-xl'></FaUserCircle>
            <span className='text-sm'>Aisha Khan</span>
          </div>
          <span className='p-1 font-semibold text-xs text-rebin-green rounded-lg bg-rebin-green'>AVAILABLE</span>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-2'>
            <FaUserCircle className='text-rebin-grey text-xl'></FaUserCircle>
            <span className='text-sm'>Sophie De Ridder</span>
          </div>
          <span className='p-1 font-semibold text-xs text-rebin-green rounded-lg bg-rebin-green'>AVAILABLE</span>
        </div>
      </div>
    </div>
  )
}

export default DriverOverview