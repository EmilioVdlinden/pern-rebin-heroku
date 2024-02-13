import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { GoMail } from "react-icons/go";
import { IoIosArrowRoundBack } from "react-icons/io";


const ForgotPassword = () => {

  const [inputs, setInputs] = useState({
    email: ''
  });

  const [mailSent, setMailSent] = useState(false);

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(inputs);
      const response = await axios.post("/password/forgot", inputs);
      setMailSent(true);
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='grid grid-cols-2 h-screen'>
      {mailSent ? (
        <div className='flex items-center justify-center p-10 bg-white'>
          <div className='mx-auto max-w-sm'>
            <div className='flex flex-col pb-7 mb-6 gap-y-5 text-center'>
              <span className='flex items-center justify-center p-4 mb-4 mx-auto w-20 h-20 border-rebin-dark-blue border-solid border-2 rounded-full'> 
                <GoMail className='text-4xl text-rebin-darkblue icon' strokeWidth={0}/>
              </span>
              <h1 className='text-3xl font-medium'>Check your email</h1>
              <h3 className='text-sm font-light text-rebin-grey'>
                Please check your email address for instructions to reset your password.
              </h3>
            </div>
            <button className='block px-2 py-4 mb-10 w-full bg-white text-rebin-darkblue rounded-lg border-rebin bg-rebin-hover hover:text-white'>Resend email</button>
          </div>
        </div> 
        ) : (
        <div className='flex items-center justify-center bg-white'>
          <div className='mx-auto max-w-sm'>
            <div className='flex flex-col pb-7 mb-6 gap-y-5 text-center divide-rebin'>
              <h1 className='text-3xl font-medium'>Forgot your password?</h1>
              <h3 className='text-sm font-light text-rebin-grey'>
                Enter your email address and we will send you instructions to reset your password.
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className='block mb-2 text-base'>Email address</label>
              <input type='email' name='email' autoComplete='off' className='block px-2 py-4 mb-10 w-full text-base font-light text-rebin-darkgrey rounded-lg border-rebin' value={inputs.email} onChange={handleChange}/>
              <button className='block rounded-lg px-2 py-4 mb-10 w-full bg-rebin-blue text-white bg-rebin-hover'>Continue</button>
              <div className='flex items-center justify-center gap-x-1 mr-2'>
                <IoIosArrowRoundBack className='text-3xl text-rebin-blue hover:font-medium'/>
                <Link to='/login' className='text-center text-rebin-blue hover:font-medium'>Back to login</Link>
              </div>
            </form>
          </div>
        </div>
        )}
      <div className='p-10 bg-rebin-light-blue text-center'>
        <h2 className='text-3xl text-rebin-darkblue'>Welcome to <span className='font-bold	'>Repoint</span></h2>
      </div>
    </div>
  )
}

export default ForgotPassword

