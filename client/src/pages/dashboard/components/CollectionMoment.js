import React from 'react';
import { IoTimeOutline } from 'react-icons/io5';

const CollectionMoment = () => {
  return (
    <div className='flex items-center justify-between min-w-56 py-4 pl-3 pr-3 text-left shadow-md rounded-lg bg-white'>
      <div className='flex flex-col'>
        <h1 className='block font-bold text-rebin-grey text-xs'>Last collection moment</h1>
        <span className='block text-rebin-darkblue text-lg font-semibold truncate'>No data available</span>
      </div>
      <div className='p-2 bg-rebin-blue rounded-lg'>
        <IoTimeOutline className='h-5 w-auto text-white'/>
      </div>
    </div>
  )
}

export default CollectionMoment