import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection,getDocs,query,orderBy,limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import SwiperCore, {Navigation,Scrollbar,Pagination,A11y} from 'swiper'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from './Spinner'
SwiperCore.use([Navigation,Pagination,Scrollbar,A11y])

function Slider() {
    const [loading,setLoading]=useState(true)
    const [listings,setListings]=useState(null)

    const navigate=useNavigate()

    useEffect(()=>{
        const fetchListings=async()=>{

        
        const listingsRef=collection(db,'listings')
        const q=query(listingsRef,orderBy('timestamp','desc'),limit(10))

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
    fetchListings()
    },[])

    if(loading){
        return <Spinner/>
    }
    
  return (
    <div className='mt-4 px-4 py-2 bg-gray-400'>
    
        <Swiper slidesPerView={1} pagination={{clickable:true}}>
            
                {listings.map((data,id)=>(
                    <SwiperSlide key={id} onClick={()=>{navigate(`/category/${data.data.type}/${data.id}`)}}>
                        <div className='w-full h-96 space-y-2'
                        style={{background:`url(${data.data.imgUrls[0]}) center no-repeat `,
                        backgroundSize:'contain'}}>

                            <p className='bg-gray-800 bg-opacity-50 text-gray-50 font-medium text-xl px-4 py-1 rounded-md max-w-fit'>{data.data.name}</p>
                            <p className='bg-white   font-medium  px-4 py-1 rounded-md max-w-fit'>${data.data.discountedPrice??data.data.regularPrice} 
                            {data.data.type === "rent" && '/ Month'}</p>
                        </div>
                    </SwiperSlide>
                    ))}
            
        </Swiper>
    </div>
  )
}

export default Slider