import {useState,useEffect} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'

import {getDoc,doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'
import Spinner from '../components/Spinner'
import { FaShare, FaShareAlt } from 'react-icons/fa'

function Listing() {
    const [listing,setListing]=useState([])
    const [loading,setLoading]=useState(true)
    const [sharedLink,setSharedLink]=useState(false)

    const navigate=useNavigate()
    const params=useParams()
    const auth=getAuth()

    useEffect(() => {
      const fetchListing=async()=>{
          const docRef=doc(db,'listings',params.listingId)

          const docSnap=await getDoc(docRef)

          if(docSnap.exists()){
              setListing(docSnap.data())
              setLoading(false)
              console.log(listing);
          }
      } 
      
      fetchListing()
      
    }, [navigate,params.listingId])
    

    if(loading){
        return <Spinner/>
    }

  return (
    <main className='min-h-screen p-4'>
        <div className='w-full justify-end flex ' onClick={()=>{
            navigator.clipboard.writeText(window.location.href)
            setSharedLink(true)
            setTimeout(() => { setSharedLink(false) }, 2000)
        }}>
            <FaShareAlt className='fill-green-500'/>    
        </div>

        {sharedLink  &&(
            <p className='right-0 px-2 text-white py-1 mt-2 mx-1 rounded-md bg-green-500 absolute'>Link Copied</p>
        )}
        <div className='flex flex-col space-y-2'>
            <p>{listing.name} - $ {listing.offer ? 
                listing.discountedPrice.toString().replace(/\B(?=(\d{2})+(?!\d))/g,',') :
                listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
             }</p>

             <p>{listing.location}</p>
             <div className='flex justify-start space-x-4'>
             <p className='text-xs bg-green-500 text-white px-2 py-0.5  rounded-md w-16'>For {listing.type ==='rent'?'Rent':'Sale'}</p>
             {listing.offer &&(
                 <p className='text-xs bg-gray-800 text-white px-2 py-0.5  rounded-md w-24'>${listing.regularPrice-listing.discountedPrice} discount</p>
             ) }
             </div>
             <ul>
                <li>
                    {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms`:'1 Bathroom'}
                </li>
                <li>
                    {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms`:'1 Bedroom'}
                </li>
                <li>{listing.parkinSpot && 'Parking Spot'}</li>
                <li>{listing.furnished && 'Furnished'}</li>  
             </ul>


             <p className='text-xl'>Location</p>
        </div>
    </main>
  )
}

export default Listing