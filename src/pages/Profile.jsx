import {useEffect,useState} from 'react'
import {getAuth} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Profile() {
  const auth =getAuth()
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })

  const {name,email}=formData
  const navigate=useNavigate()
  const onLogOut=()=>{
    auth.signOut()
    navigate('/')
  }
  return (
    <div className=''>
      <header className='flex justify-between mx-4 my-2'>
        <h1 className='text-xl font-semibold'>My Profile</h1>
        <button className='px-2 py-1 bg-green-500 font-semibold text-white rounded-xl' onClick={onLogOut}>Log out</button>
      </header>
    </div>
  )
}

export default Profile