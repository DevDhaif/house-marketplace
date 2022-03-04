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
        console.log(formData);
    }

    const onMutate=(e)=>{
       let boolean=null
       
       if(e.target.value === "true"){
        boolean=true
       }
       else if(e.target.value === "false"){
        boolean=false
       }


       if(e.target.files){
           setFormData((prev)=>({
               ...prev,
               images:e.target.files
           }))
       }

       if(!e.target.files){
        setFormData((prev)=>({
            ...prev,
            [e.target.id]:boolean ?? e.target.value
        }))
       }
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

                <label htmlFor="" className='font-medium '>Sell / Rent</label>
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
            

            <div className=' flex mt-4 space-x-4'>
                <div className=' flex flex-col space-y-1'>
                    <label htmlFor="" className='font-medium '>Bathrooms</label>
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
                    <label htmlFor="" className='font-medium '>Bedrooms</label>
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

            <label htmlFor="" className='block mt-4 font-medium '>Parking Spot</label>
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

            <label htmlFor="" className='block mt-4 font-medium '>Furnished</label>
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

            <label htmlFor="" className='block mt-4 font-medium '>Address</label>
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
                        <label htmlFor="" className='block mt-4 font-medium '>Latitude</label>
                        <input
                        className=' py-1 w-2/3 text-center rounded-md border-none outline-none ' 
                        type="number"
                        id='latitude'
                        value={latitude}
                        onChange={onMutate}
                        required />
                    </div>
                    <div className='flex flex-col  '>
                        <label htmlFor="" className='block mt-4 font-medium '>Latitude</label>
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

            <label htmlFor="" className='block mt-4 font-medium '>Offer</label>
            <div className='flex space-x-4 px-2 mt-1 '>
                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${offer?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='offer'
                value={true}
                onClick={onMutate}
                >
                    Yes
                </button>

                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${!offer && offer!== null?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='offer'
                value={false}
                onClick={onMutate}
                >
                    No
                </button>
            </div>


            <label htmlFor="" className='block mt-4 font-medium '>Regular Price</label>
            <div className='flex items-center  space-x-2'>
                <input 
                type="number" 
                className='w-12 py-1 text-center rounded-md border-none outline-none'
                id={"regularPrice"}
                value={regularPrice}
                onChange={onMutate}
                min='50'
                max='75000000'
                required
                />
                {type==='rent' && (
                    <p className='font-medium'> $ / Month</p>
                )}
            </div>

            {offer &&(
                <div>
                <label htmlFor="" className='block mt-4 font-medium '>Discounted Price</label>
                <div className='flex items-center  space-x-2'>
                    <input 
                    type="number" 
                    className='w-12 py-1 text-center rounded-md border-none outline-none'
                    id={"discountedPrice"}
                    value={discountedPrice}
                    onChange={onMutate}
                    min='50'
                    max='75000000'
                    required={offer}
                    />
                </div>
                </div>
            )}


            <label htmlFor="" className='block mt-4 font-medium '>Images</label>
            <p className='my-2'>First image will be the cover (only 6 images)</p>
            <input
            className='file:mr-2 w-full file:px-2 file:py-1 px-4 py-2 file:font-medium bg-white rounded-md file:bg-green-500 file:border-none file:text-white file:rounded-lg' 
            type="file"
            id="images"
            onChange={onMutate}
            max="6"
            accept='.jpg,.png,.jpeg'
            multiple
            required
            />

            <button className='block px-4 py-1 bg-green-500 text-white font-medium rounded-md shadow-md shadow-gray-300 w-2/3 mx-auto createListingButton' type="submit">Create Listing</button>
            </form>
        </main>
    </div>
  )
}

export default CreateListing