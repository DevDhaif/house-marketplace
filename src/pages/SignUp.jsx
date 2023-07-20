import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FaEye } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { BsPerson } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import OAuth from "../components/OAuth"
import { useTranslation } from "react-i18next"

function SignUp() {
  const {t} = useTranslation();
  const [showPassword, setShowPassword] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = formData
  const navigate = useNavigate()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/')
    }
    catch (error) {
      toast.error(t('wrongCreditentials'))
    }
  }
  return (
    <div className="w-full relative px-4 bg-gray-100 space-y-12 flex flex-col justify-center  h-full min-h-screen">
      <header className="px-4 py-6 text-center">
        <h1 className="text-xl">{t('welcomeBack')}</h1>
      </header>
      <main className="container mx-auto max-w-2xl py-8 px-4 outline-dashed outline-1 outline-blue-400/50  rounded shadow-md  w-full">
        <form className="space-y-8" onSubmit={onSubmit}>
          <label htmlFor="name" className="relative text-gray-400 focus-within:text-gray-600 block w-full">
            <BsPerson className=" w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-0 ml-2" />
            <input className="pl-10 py-3 rounded-lg  w-full outline-none" type="text" name="name" id="name" value={name} placeholder={t('name')} onChange={onChange} />
          </label>
          <label htmlFor="email" className="relative text-gray-400 focus-within:text-gray-600 block w-full">
            <MdEmail className=" w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-0 ml-2" />
            <input className="pl-10 py-3 rounded-lg  w-full outline-none" type="email" name="email" id="email" value={email} placeholder={t('email')} onChange={onChange} />
          </label>
          <label htmlFor="email" className="relative flex text-gray-400 focus-within:text-gray-600 items-center w-full">
            <RiLockPasswordFill className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-0 ml-2" />
            <input className="pl-10 py-3 rounded-lg  w-full outline-none" type={showPassword ? 'text' : 'password'} name="password" id="password" value={password} placeholder={t('password')} onChange={onChange} />
            <FaEye className="cursor-pointer opacity-80 hover:opacity-100 h-6 w-6 absolute right-0 mr-2" onClick={() => { setShowPassword((prevState) => !prevState) }} />
          </label>



          <button type="submit" className="flex space-x-4 w-full justify-between md:justify-start items-center">
            <p className="text-lg font-semibold">{t('signup')}</p>
            <span className=""><IoIosArrowDroprightCircle className="mt-1 w-8 h-8  rounded-full fill-green-500" /></span>
          </button>
        </form>


        <OAuth />

        <div className="flex  space-x-4  justify-center mt-4">
          <p className="text-base font-semibold text-gray-400 text-center mt-4">{t('dontHaveAccount')}</p>
          <Link to={'/sign-in'}>
            <p className="text-base font-semibold text-green-700 text-center mt-4">{t('signin')}</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default SignUp