import {useState,useEffect} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'

import {getDoc,doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'
import Spinner from '../components/Spinner'
import { FaBackward, FaShare, FaShareAlt } from 'react-icons/fa'
import { RiArrowLeftSLine } from 'react-icons/ri'

import {MapContainer,Marker,Popup,TileLayer} from 'react-leaflet' 
import SwiperCore, {Navigation,Scrollbar,Pagination,A11y} from 'swiper'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Navigation,Pagination,Scrollbar,A11y])
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
              console.log(listing);
              setLoading(false)
              
          }
      } 
      
      fetchListing()
      
    }, [navigate,params.listingId])
    

    if(loading){
        return <Spinner/>
    }

  return (
    <main className='min-h-screen p-4'>

        <Swiper slidesPerView={1} pagination={{clickable:true}}>

            {listing.imgUrls.map((url,index)=>(
                <SwiperSlide key={index} >
                    <div 
                    className='w-full h-96'
                    style={{background:`url(${listing.imgUrls[index]})
                     center no-repeat `,
                    backgroundSize:'contain'}}>
                        
                        
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>


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

            <div className='h-56 w-12/12'>
                <MapContainer style={{height:'100%',width:'100%'}} 
                center={[listing.geoLocation.lat,listing.geoLocation.lng]}
                zoom={13}
                scrollWheelZoom={false}>

                <TileLayer  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'/>
                <Marker  onClick={((e)=>console.log(e))}    position={[listing.geoLocation.lat,listing.geoLocation.lng]}>
                    <Popup >{listing.location}</Popup>
                    
                </Marker>
                </MapContainer>
            </div>


             {auth.currentUser?.uid !== listing.userRef &&(
                 <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                        className="mx-auto px-12 py-3 font-semibold shadow-md shadow-gray-300 bg-green-500 text-white rounded-md">
                    Contact Owner
                    
                 </Link>
             )}
             <button onClick={() => navigate(-1)}><RiArrowLeftSLine className='fill-green-500 w-10 h-10 absolute bottom-24  bg-white rounded-full'/></button>
        </div>
    </main>
  )
}

export default Listing