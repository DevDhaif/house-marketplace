import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection,getDocs,query,orderBy,limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import SwiperCore, {Navigation,Scrollbar,Pagination,A11y,Autoplay} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'
import Spinner from './Spinner'
// import "swiper/css"
import 'swiper/swiper.min.css';
// import 'swiper/css/';

SwiperCore.use([Navigation,Pagination,Scrollbar,A11y])

import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next'


function Slider() {
    const {t} = useTranslation();
    const isRtl = document.body.dir === "rtl";
    const [loading,setLoading]=useState(true)
    const [listings,setListings]=useState([])

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
    }
    fetchListings()
    },[isRtl])
    const slides = [...listings]

    if(loading){
        return <Spinner/>
    }
    if(listings.length === 0){
        return <div>
        </div>
    }
  return (
    <motion.div 
    initial={{ opacity: 0 ,y: -1000}}
        animate={{ opacity: 1, y:0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
    className='mt-4 px-4 py-2  rounded-md shadow-md'>
    
        <Swiper loop={true} grabCursor={true} dir="rtl"
            navigation={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
        

         slidesPerView={1} pagination={{clickable:true}}>
            
                {slides.map((data,id)=>(
                    <SwiperSlide  key={id} onClick={()=>{navigate(`/category/${data.data.type}/${data.id}`)}}>
                        <div className='w-full h-72  gap-y-2'
                        style={{background:`url(${data.data.imgUrls[0]}) center no-repeat `,
                        backgroundSize:'contain'}}>

                            <p className='bg-gray-800 bg-opacity-50 text-gray-50 font-medium text-xl px-4 py-1 rounded-md max-w-fit'>{data.data.name}</p>
                            <p className='bg-white   font-medium  px-4 py-1 rounded-md max-w-fit'>${data.data.discountedPrice??data.data.regularPrice} 
                            {data.data.type === "rent" && ` / ${t('month')}`}</p>
                        </div>
                    </SwiperSlide>
                    ))}
            
        </Swiper>
        
    </motion.div>
  )
}

export default Slider