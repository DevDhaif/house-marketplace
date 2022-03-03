import React, { useState,useEffect,useRef } from 'react'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

function CreateListing() {
    const [geoLocationEnabled,setGeoLocationEnabled]=useState(true)
    const [loading,setLoading]=useState(false)
const[formData,setFormData]=useState({
    type:"rent",
    name:'',
    bedrooms:1,
    bathrooms:1,
    parking:false,
    furnished:false,
    address:'',
    offer:false,
    regularPrice:0,
    discountedPrice:0,
    images:{},
    latitude:0,
    longitude:0

})
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude
} =formData

    const auth=getAuth()
    const navigate=useNavigate()
    const isMounted=useRef(true)

    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth,(user)=>{
                if(user){
                    setFormData({...formData,userRef:user.uid})
                }
                else{
                    navigate('/sign-in')
                }
            })
        }
        return ()=>{
            isMounted.current = false
        }
        // eslint-disable-nextline react-hooks/exhaustive-deps
    },[isMounted])

    const onSubmit=(e)=>{
        e.preventDefault() 
    }

    const onMutate=()=>{

    }


    if(loading){
        return <Spinner/>
    }
    return (
    <div className='w-full  px-4'>
        <header>
            <p className='text-2xl font-semibold'>Create Listing</p>
        </header>

        <main >

            <form onSubmit={onSubmit} className="mt-4 flex flex-col space-y-2">

                <label htmlFor="" className='font-medium block'>Sell / Rent</label>
                <div className='flex space-x-4 px-2 mt-1 '>
                    <button 
                    type='button' 
                    className={`  font-semibold px-6 py-1 shadow-md shadow-gray-300  bg-white rounded-lg ${type==='sale'?'bg-green-500 text-white':'bg-white'}`}
                    id="type"
                    value="sale"
                    onClick={onMutate}>
                        Sell
                     </button>
                    <button type='button' 
                    className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${type==='rent'?'bg-green-500 text-white':'bg-white'} `}
                    id="type"
                    value="rent"
                    onClick={onMutate}>
                    Rent 
                    </button>
                </div>

                <label htmlFor="" className='font-medium'>Name</label>
                <input
                className='w-2/3 p-1 rounded-md border-none outline-none' 
                type="text"
                id='name'
                value={name}
                onChange={onMutate}
                maxLength='32'
                minLength='10'
                required  />
            </form>

            <div className=' flex mt-4 space-x-4'>
                <div className=' flex flex-col space-y-1'>
                    <label htmlFor="">Bathrooms</label>
                    <input 
                    className='w-12 py-1 text-center rounded-md border-none outline-none'
                    type="number"
                    id='bathrooms'
                    value={bathrooms}
                    onChange={onMutate}
                    min='1'
                    max='50'
                    required />
                </div>

                <div className=' flex flex-col space-y-1'>
                    <label htmlFor="">Bedrooms</label>
                    <input 
                    className='w-12 py-1 text-center rounded-md border-none outline-none'
                    type="number"
                    id='bedrooms'
                    value={bedrooms}
                    onChange={onMutate}
                    min='1'
                    max='50'
                    required />
                </div>
            </div>

            <label htmlFor="" className='block mt-4'>Parking Spot</label>
            <div className='flex space-x-4 px-2 mt-1 '>
                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${parking?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='parking'
                value={true}
                onClick={onMutate}
                >
                    Yes
                </button>

                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${!parking && parking!== null?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='parking'
                value={false}
                onClick={onMutate}
                >
                    No
                </button>
            </div>

            <label htmlFor="" className='block mt-4'>Furnished</label>
            <div className='flex space-x-4 px-2 mt-1 '>
                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${furnished?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='furnished'
                value={true}
                onClick={onMutate}
                >
                    Yes
                </button>

                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${!furnished && furnished!== null?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='furnished'
                value={false}
                onClick={onMutate}
                >
                    No
                </button>
            </div>

            <label htmlFor="" className='block mt-4'>Address</label>
            <textarea
            className='w-2/3 rounded-lg mt-2'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            required
            />

            {!geoLocationEnabled &&(
                <div className='w-full flex space-x-2 '>
                    <div className='flex flex-col '>
                        <label htmlFor="">Latitude</label>
                        <input
                        className=' py-1 w-2/3 text-center rounded-md border-none outline-none ' 
                        type="number"
                        id='latitude'
                        value={latitude}
                        onChange={onMutate}
                        required />
                    </div>
                    <div className='flex flex-col  '>
                        <label htmlFor="">Latitude</label>
                        <input
                        className=' py-1 w-2/3 text-center rounded-md border-none outline-none '  
                        type="number"
                        id='latitude'
                        value={latitude}
                        onChange={onMutate}
                        required />
                    </div>
                </div>
            )}
        </main>
    </div>
  )
}

export default CreateListing