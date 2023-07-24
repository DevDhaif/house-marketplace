import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {getAuth ,sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?component';
import { BsPerson } from 'react-icons/bs';
import SignIn from './SignIn';
import { useTranslation } from 'react-i18next';

function ForgotPassword() {
  const {t} = useTranslation();
  const [email, setEmail] = useState('')
  const onChange=(e)=>{
setEmail(e.target.value)
  }
  const onSubmit=async(e)=>{
    e.preventDefault()

    try{
      const auth=getAuth()

      await sendPasswordResetEmail(auth,email)

      toast.success(t('emailResetLink'))
    }
    catch(error){
      toast.error(t('emailResetError'))

    }
  }
  return (
    <div className='container'>
        <header className='my-4'>
          <p className='text-xl font-semibold text-center'>{t('forgotPassword')}</p>
        </header>
        <main className='mx-4 my-6 '>
        <form className="gap-y-4" onSubmit={onSubmit}>
          <label htmlFor="email" className="relative text-gray-400 focus-within:text-gray-600 block w-full">
              <BsPerson className=" w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-0 ml-2"/>
              <input className="pl-10 py-3 rounded-lg  w-full outline-none" type="email" name="email" id="email" value={email} placeholder={t('email')} onChange={onChange}/>
          </label>
          <div className="mt-8 flex justify-end text-blue-500 font-semibold">
            <Link to={<SignIn/>}>{t('signin')}</Link>
          </div>

         <div className='w-full  '>
          <div className='flex justify-between text-lg font-semibold'> 
          {t('sendResetLink')}
              <button>
                <ArrowRightIcon className="fill-white bg-blue-500 rounded-full " />
              </button>
          </div>
         </div>
          </form>
        </main>
    </div>
  )
}

export default ForgotPassword