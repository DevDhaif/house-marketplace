import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {getAuth ,sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?component';
import { BsPerson } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import SignIn from './SignIn';

function ForgotPassword() {
  
  const [email, setEmail] = useState('')
  const onChange=(e)=>{
setEmail(e.target.value)
  }
  const onSubmit=async(e)=>{
    e.preventDefault()

    try{
      const auth=getAuth()

      await sendPasswordResetEmail(auth,email)

      toast.success("A reset link has been sent to Your Email!")
    }
    catch(error){
      toast.error("Could not send reset Email!")

    }
  }
  return (
    <div className='container'>
        <header className='my-4'>
          <p className='text-xl font-semibold text-center'>Forgot Password</p>
        </header>
        <main className='mx-4 my-6 '>
        <form className="space-y-4" onSubmit={onSubmit}>
          <label htmlFor="email" className="relative text-gray-400 focus-within:text-gray-600 block w-full">
              <BsPerson className=" w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-0 ml-2"/>
              <input className="pl-10 py-3 rounded-lg  w-full outline-none" type="email" name="email" id="email" value={email} placeholder="Email" onChange={onChange}/>
          </label>
          <div  className="mt-8 flex justify-end text-green-500 font-semibold">
            <Link to={<SignIn/>}>SignIn</Link>
          </div>

         <div className='w-full  '>
          <div className='flex justify-between text-lg font-semibold'> 
          Send Reset Link
              <button>
                <ArrowRightIcon className="fill-white bg-green-500 rounded-full "/>
              </button>
          </div>
         </div>
          </form>
        </main>
    </div>
  )
}

export default ForgotPassword