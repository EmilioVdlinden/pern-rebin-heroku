import React from 'react'
import Rebin from '../assets/embleem@4x.png'
import { GrHomeRounded } from "react-icons/gr";
import { BiBarChartAlt2 } from "react-icons/bi";
import { LuTrash, LuLogOut } from "react-icons/lu";
import { RiSendPlaneLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

const Navbar = ({setIsAuthenticated}) => {

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }


  return (
    <section className='bg-white'>
      <nav className='flex flex-col justify-between items-center py-10 w-24 h-screen rounded-r-xl bg-white' aria-label='Global'>
        <a className='w-14 p-3 shadow-md rounded-lg' href="/dashboard">
          <span className='sr-only'>Rebin</span>
          <img src={Rebin} alt="" />
        </a>
        <div className='flex flex-col items-center gap-y-16'>
          <a className='' href="#">
            <span className='sr-only'>Dashboard</span>
            <GrHomeRounded className='w-5 h-auto text-rebin-grey text-rebin-blue-hover'></GrHomeRounded>
          </a>
          <a className='' href="#">
            <span className='sr-only'>Navigation</span>
            <RiSendPlaneLine className='w-5 h-auto text-rebin-grey text-rebin-blue-hover'></RiSendPlaneLine>
          </a>
          <a className='' href="#">
            <span className='sr-only'>Bins</span>
            <LuTrash className='w-5 h-auto text-rebin-grey text-rebin-blue-hover'></LuTrash>
          </a>
          <a className='' href="#">
            <span className='sr-only'>Statistics</span>
            <BiBarChartAlt2 className='w-5 h-auto text-rebin-grey text-rebin-blue-hover'></BiBarChartAlt2>
          </a>
          <a className='' href="#">
            <span className='sr-only'>Profile</span>
            <FaRegUser className='w-5 h-auto text-rebin-grey text-rebin-blue-hover'></FaRegUser>
          </a>
        </div>
        <a onClick={handleLogout} className='' href="#">
          <span className='sr-only'>Log out</span>
          <LuLogOut className='w-5 h-auto text-rebin-grey text-rebin-blue-hover'></LuLogOut>
        </a>
      </nav>
    </section>
  );
}

export default Navbar