import {React, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Checkbox from '../../components/Checkbox';


const Login = ({setIsAuthenticated}) => {

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post("/auth/login", inputs);
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
            <h1 className='text-3xl font-medium'>Log in to your account</h1>
            <h3 className='text-sm font-light text-rebin-grey'>Welcome back! Please enter your details.</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className='block mb-2 text-base'>Email address</label>
            <input type='email' name='email' autoComplete='off' className='block px-2 py-4 mb-5 w-full text-base font-light text-rebin-darkgrey rounded-lg border-rebin' value={inputs.email} onChange={handleChange}/>
            <label htmlFor="password" className='block mb-2 text-base'>password</label>
            <input type='password' name='password' autoComplete='off' className='block px-2 py-4 mb-5 w-full rebin-password rounded-lg border-rebin' value={inputs.password} onChange={handleChange}/>
            <div className='flex justify-between items-center mb-6'>
              <div className='flex items-center gap-x-2'>
                <Checkbox></Checkbox>
                <span className='text-base font-light text-rebin-darkgrey'>Remember me</span>
              </div>
              <Link to='/password' className='text-base font-light text-rebin-blue hover:font-medium'>Forgot password?</Link>
            </div>
            <button className='block rounded-lg px-2 py-4 mb-10 w-full bg-rebin-blue text-white bg-rebin-hover'>Log in</button>
            <span className='block text-center text-base font-light text-rebin-darkgrey'>Don't have an account? <Link to='/register' className='text-rebin-blue hover:font-medium'>Create an account</Link></span>
          </form>
        </div>
      </div>
      <div className='p-10 bg-rebin-light-blue text-center'>
        <h2 className='text-3xl text-rebin-darkblue'>Welcome to <span className='font-bold	'>Repoint</span></h2>
      </div>
    </div>
  )
}

export default Login