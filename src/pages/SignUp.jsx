import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import { doc, setDoc ,serverTimestamp} from "firebase/firestore"; 
import { FaEye} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import {BsPerson} from 'react-icons/bs'
import {RiLockPasswordFill} from 'react-icons/ri'
import {IoIosArrowDroprightCircle} from 'react-icons/io'
import OAuth from "../components/OAuth"

function SignUp() {
  const [showPassword,setShowPassword]=useState(true)
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:''
  })
  const {name,email,password}=formData
  const navigate=useNavigate()
  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

  const onSubmit=async(e)=>{
    e.preventDefault()

    try {
      const auth=getAuth()

      const userCredential=await createUserWithEmailAndPassword(auth,email,password)

      const user=userCredential.user

      updateProfile(auth.currentUser,{
        displayName:name,
      })
      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timestamp=serverTimestamp()
      await setDoc(doc(db,'users',user.uid),formDataCopy)
      navigate('/')
    }
    catch (error){
      toast.error("Worng Credintials!")
    }
  }
  return (
    <div className="w-full px-4 bg-gray-100 h-full">
      <header className="px-4 py-6 text-center">
        <h1 className="text-xl">Welcome Back!</h1>
      </header>
      <main>
        <form className="space-y-4" onSubmit={onSubmit}>
          <label htmlFor="name" className="relative text-gray-400 focus-within:text-gray-600 block w-full">
              <BsPerson className=" w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-0 ml-2"/>
              <input className="pl-10 py-3 rounded-lg  w-full outline-none" type="name" name="name" id="name" value={name} placeholder="Name" onChange={onChange}/>
          </label>
          <label htmlFor="email" className="relative text-gray-400 focus-within:text-gray-600 block w-full">
              <MdEmail className=" w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-0 ml-2"/>
              <input className="pl-10 py-3 rounded-lg  w-full outline-none" type="email" name="email" id="email" value={email} placeholder="Email" onChange={onChange}/>
          </label>
          <label htmlFor="email" className="relative flex text-gray-400 focus-within:text-gray-600 items-center w-full">
              <RiLockPasswordFill className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-0 ml-2"/>
              <input className="pl-10 py-3 rounded-lg  w-full outline-none" type={showPassword?'text':'password'} name="password" id="password" value={password} placeholder="password" onChange={onChange}/>
              <FaEye className="cursor-pointer opacity-80 hover:opacity-100 h-6 w-6 absolute right-0 mr-2" onClick={()=>{setShowPassword((prevState)=>!prevState)}}/>
          </label>

          

          <div className="flex space-x-4 w-full justify-between md:justify-start items-center">
            <p className="text-lg font-semibold">SignUp</p>
            <button className=""><IoIosArrowDroprightCircle className="mt-1 w-8 h-8  rounded-full fill-green-500"/></button>
          </div>
        </form>


        <OAuth/>

        
        <Link to={'/sign-in'}>
          <p className="text-base font-semibold text-green-700 text-center mt-4">Sign In</p>
        </Link>
      </main>
    </div>
  )
}

export default SignUp