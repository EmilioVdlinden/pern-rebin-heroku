import {React, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



const Register = ({setIsAuthenticated}) => {

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      const response = await axios.post("/auth/register", inputs);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      
    } catch (err) {
        console.log(err.message);
    }
  }   

  return (
    <div className='grid grid-cols-2 h-screen'>
      <div className='flex items-center justify-center p-10 bg-white'>
        <div className='mx-auto max-w-sm'>
          <div className='flex flex-col pb-7 mb-6 gap-y-5 text-center divide-rebin'>
            <h1 className='text-3xl font-medium'>Create your account</h1>
            <h3 className='text-sm font-light text-rebin-grey'>Unlock our smart waste features.</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className='block mb-2 text-base'>Name</label>
            <input type='text' required name='name' autoComplete='off' className='block px-2 py-4 mb-5 w-full text-base font-light text-rebin-darkgrey rounded-lg border-rebin' value={inputs.name} onChange={handleChange}/>
            <label htmlFor="email" className='block mb-2 text-base'>Email address</label>
            <input type='email' required name='email' autoComplete='off' className='block px-2 py-4 mb-5 w-full text-base font-light text-rebin-darkgrey rounded-lg border-rebin' value={inputs.email} onChange={handleChange}/>
            <label htmlFor="password" className='block mb-2 text-base'>Password</label>
            <input type='password' required name='password' autoComplete='off' className='block px-2 py-4 mb-10 w-full rebin-password rounded-lg border-rebin' value={inputs.password} onChange={handleChange}/>
            <button className='block rounded-lg px-2 py-4 mb-10 w-full bg-rebin-blue text-white bg-rebin-hover'>Create account</button>
            <span className='block text-center text-base font-light text-rebin-darkgrey'>You have an account? <Link to='/' className='text-rebin-blue hover:font-medium'>Login now</Link></span>
          </form>
        </div>
      </div>
      <div className='p-10 bg-rebin-light-blue text-center'>
        <h2 className='text-3xl text-rebin-darkblue'>Welcome to <span className='font-bold	'>Repoint</span></h2>
      </div>
    </div>
  )
}

export default Register