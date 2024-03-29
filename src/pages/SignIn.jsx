import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FaEye } from 'react-icons/fa'
import { BsPerson } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import OAuth from "../components/OAuth"
import { useTranslation } from "react-i18next"
function SignIn() {
  const {t} = useTranslation();
  const [showPassword, setShowPassword] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
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

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        navigate('/')
        toast.success("Success!")

      }
    }
    catch (error) {
      toast.error('Bad User Credintial',
        {
          position: toast.POSITION.TOP_CENTER,
          className: 'w-2/3  mx-auto rounded-full  '
        }
      )
    }


  }
  return (
    <div className="w-full relative px-4 bg-gray-100 gap-y-12 flex flex-col justify-center  h-full min-h-screen">
      <header className="px-4 py-6 text-center mx-auto">
        <h1 className="text-xl">{t('welcomeBack')}</h1>
      </header>
      <main className="container mx-auto max-w-2xl py-8 px-4 outline-dashed outline-1 outline-blue-400/50  rounded shadow-md  w-full">
        <form className="gap-y-8" onSubmit={onSubmit}>
          <label htmlFor="email" className="relative text-gray-400 focus-within:text-gray-600 block w-full">
            <BsPerson className=" w-6 h-6 absolute top-1/2 transform -translate-y-1/2 ltr:left-0 rtl:right-0 ltr:ml-2 rtl:mr-2" />
            <input className="ltr:pl-10 rtl:pr-10 py-3 rounded-lg  w-full outline-none" type="email" name="email" id="email" value={email} placeholder={t('email')} onChange={onChange} />
          </label>
          <label htmlFor="email" className="relative flex text-gray-400 focus-within:text-gray-600 items-center w-full">
            <RiLockPasswordFill className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 ltr:left-0 rtl:right-0 ltr:ml-2 rtl:mr-2 " />
            <input className="ltr:pl-10 rtl:pr-10 py-3 rounded-lg  w-full outline-none" type={showPassword ? 'text' : 'password'} name="password" id="password" value={password} placeholder={t('password')} onChange={onChange} />
            <FaEye className="h-6 w-6 absolute ltr:right-0 rtl:left-0 ltr:mr-2 rtl:ml-2" onClick={() => { setShowPassword((prevState) => !prevState) }} />
          </label>

          <Link to={'/forgot-password'} className="text-blue-700 text-lg  text-right py-4">
            <p className="my-4 font-semibold">{t('forgotPassword')}</p>
          </Link>

          <button type="submit" className="flex gap-x-4 w-full justify-between   md:justify-start items-center">
            <p className="text-lg font-semibold">{t('signin')}</p>
            <span className=""><IoIosArrowDroprightCircle className="mt-1 w-8 h-8 rtl:-scale-x-90  rounded-full fill-blue-500" /></span>
          </button>
        </form>


        <OAuth />
        <div className="flex  gap-x-4  justify-center mt-4">
          <p className="text-base font-semibold text-gray-400 text-center mt-4">{t('dontHaveAccount')}</p>
          <Link to={'/sign-up'}>
            <p className="text-base font-semibold text-blue-700 text-center mt-4">{t('signup')}</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default SignIn