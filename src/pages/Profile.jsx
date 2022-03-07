import {useEffect,useState} from 'react'
import {getAuth,updateProfile} from 'firebase/auth'
import { doc, updateDoc,collection,getDocs,query,where,orderBy,deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Link, useNavigate } from 'react-router-dom'
import ProfileIcon from '../assets/svg/profile.svg?component';
import { toast } from "react-toastify"
import { FaArrowRight, FaHome, FaXbox } from 'react-icons/fa'
import { RiArrowRightSLine } from 'react-icons/ri'
import Listing from './Listing'
import ListingIte from '../components/ListingIte'
import {AiFillDelete } from 'react-icons/ai'



function Profile() {

  const [loading,setLoading]=useState(true)
  const [listings,setListings]=useState([])

  const auth =getAuth()

  const [changeDetails,setChangeDetails]=useState(false)
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })

  const {name,email}=formData

  const navigate=useNavigate()
  
  useEffect(()=>{
    const fetchUserListings=async()=>{

      const listingsRef=collection(db,'listings')

      const q=query(listingsRef,where('userRef','==',auth.currentUser.uid),orderBy('timestamp','desc'))

      const querySnap=await getDocs(q)

      let listings=[]
      querySnap.forEach((doc)=>{
        return listings.push({
          id:doc.id,
          data:doc.data()
        })
      })

      setListings(listings)
      setLoading(false)
      console.log(listings);
     
    }
    fetchUserListings()
  },[auth.currentUser.uid])

  const onLogOut=()=>{
    auth.signOut()
    navigate('/')
  }

  const onSubmit=async()=>{
    try{
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser,{
          displayName:name
        })

        const userRef=doc(db,'users',auth.currentUser.uid)
        await updateDoc(userRef,{
          name
        })
      }
    }
    catch(error){
      toast.error("Couldn't Update Data")
    }
  }

  const onChange=(e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.id]:e.target.value
    }))
  }


  const onDelete=async(listingId)=>{
    
    if(window.confirm("Are you sure ?")){
        await deleteDoc(doc(db,'listings',listingId))
        console.log(listings)
        const updatedListings= listings.filter(
          (listing)=> listing.id !== listingId
        )
        
        setListings(updatedListings)
        console.log(updatedListings);
        toast.success("Deleted succesfully")
    }
  }
  return (
    <div className='mb-12'>
      <header className='flex justify-between mx-4 my-2'>
        <h1 className='text-xl font-semibold'>My Profile</h1>
        <button className='px-2 py-1 bg-green-500 font-semibold text-white rounded-xl' onClick={onLogOut}>Log out</button>
      </header>

      <main className='mx-2 my-4'>
        <div className='flex justify-between font-semibold'>
          <p>Personal Details:</p>
          <p className=' text-green-500 text-sm cursor-pointer' onClick={()=>{
            changeDetails && onSubmit()
            setChangeDetails((prev)=>!prev)
          }}>{changeDetails? 'Done':'change  '}</p>
          </div>
          <div className='justify-center   flex'>
            <ProfileIcon className="w-16 h-16 rounded-full" />
          </div>
          <h2 className='w-full text-center border-b-2 border-solid border-green-500 my-4 px-2'><span className='bg-slate-100 px-2 max-w-xs'>{(auth.currentUser.displayName).toUpperCase()} Profile</span></h2>

        <div>
          <form className='my-2 space-y-2'>
            <input type="text" id='name' 
            className={`w-full px-2 py-2 my-0.5 outline-none    ${!changeDetails?'':'bg-gray-200'}`}  
            disabled={!changeDetails}
            value={name}
            onChange={onChange}/>

            <input type="email" id='email' 
            className={`w-full px-2 py-2 my-0.5 outline-none    ${!changeDetails?'':'bg-gray-200'}`}  
            disabled={!changeDetails}
            value={email}
            onChange={onChange}/>
          </form>
        </div>

        <Link to="/create-listing" className='w-full flex justify-between  items-center mt-8 px-4 py-2 bg-gray-200 rounded-lg'>
          <FaHome/>
        <p>Sell or rent home</p>
          <RiArrowRightSLine/>
        </Link>

        {!loading && listings?.length>0 &&
        
          (
            <div className='mt-4 p-4 space-y-4'>
          {listings.map((listing)=>(
                <ListingIte key={listing.id} listing={listing.data} id={listing.id} onDelete={()=>onDelete(listing.id)}/>
          ))}
        </div>
          )
        }
        
      </main>
    </div>
  )
}

export default Profile