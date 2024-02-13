import {React, useState} from 'react';
import { useParams } from 'react-router-dom';
import { IoMdCheckmark } from "react-icons/io";
import axios from 'axios';
import {Link} from 'react-router-dom';



const ResetPassword = () => {

  const {user_id, token} = useParams();
  const [inputs, setInputs] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [updated, setUpdated] = useState(false);

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(`/password/reset/${user_id}/${token}`, {"password": inputs.newPassword});
      if(response.data.update){
        setUpdated(true);
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='grid grid-cols-2 h-screen'>
      {updated ? (
        <div className='flex items-center justify-center p-10 bg-white'>
          <div className='mx-auto max-w-sm'>
            <div className='flex flex-col pb-7 mb-6 gap-y-5 text-center'>
              <span className='flex items-center justify-center p-4 mb-4 mx-auto w-20 h-20 border-rebin-blue border-solid rounded-full'> 
                <IoMdCheckmark className='text-4xl text-rebin-blue'/>
              </span>
              <h1 className='text-3xl font-medium'>Password changed</h1>
              <h3 className='text-sm font-light text-rebin-grey'>
                You can now use your new password to log in to your account.
              </h3>
            </div>
            <Link to='/login' className='block rounded-lg px-2 py-4 mb-10 w-full bg-rebin-blue text-center text-white bg-rebin-hover'>Log in</Link>
          </div>
        </div> 
      ) : (
        <div className='flex items-center justify-center p-10 bg-white'>
          <div className='mx-auto max-w-sm'>
            <div className='flex flex-col pb-7 mb-6 gap-y-5 text-center divide-rebin'>
              <h1 className='text-3xl font-medium'>Change your password</h1>
              <h3 className='text-sm font-light text-rebin-grey'>Enter a new password below to change<br/>your current password.</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="newPassword" className='block mb-2 text-base'>New password</label>
              <input type='password' name='newPassword' autoComplete='off' className='block px-2 py-4 mb-5 w-full rebin-password rounded-lg border-rebin' value={inputs.newPassword} onChange={handleChange}/>
              <label htmlFor="confirmPassword" className='block mb-2 text-base'>Confirm password</label>
              <input type='password' name='confirmPassword' autoComplete='off' className='block px-2 py-4 mb-10 w-full rebin-password rounded-lg border-rebin' value={inputs.confirmPassword} onChange={handleChange}/>
              <button className='block rounded-lg px-2 py-4 mb-10 w-full bg-rebin-blue text-white bg-rebin-hover'>Change password</button>
            </form>
          </div>
        </div>
      )}
      <div className='p-10 bg-rebin-light-blue text-center'>
        <h2 className='text-3xl text-rebin-darkblue'>Welcome to <span className='font-bold'>Repoint</span></h2>
      </div>
    </div>
  )
}

export default ResetPassword

