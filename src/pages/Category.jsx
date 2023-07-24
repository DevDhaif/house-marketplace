import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection,getDocs,query,where,orderBy,limit,startAfter}  from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingIte from '../components/ListingIte'
import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next'


function Category() {
    const {t} = useTranslation();
    const [listings,setListings]=useState([])
    const [loading,setLoading]=useState(true)
    const [lastFetchedListing,setLastFetchedListing]=useState(null)

    const params=useParams()

    useEffect(()=>{
     const fetchListings=async()=>{
         try{
            //get Ref
            const listingsRef=collection(db,'listings')
            const q=query(listingsRef,
                where('type','==',params.categoryName),
                orderBy('timestamp','desc'),
                limit(5))
            
            const querySnap=await getDocs(q)

            const lastVisible=querySnap.docs[querySnap.docs.length-1]
            setLastFetchedListing(lastVisible)
            
            const listings=[]
            querySnap.forEach((doc)=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                }) 
            })
            

            setListings(listings)
            setLoading(false)
        }
        
         catch(error){
            toast.error("error")
         }
     }   

     fetchListings()
    },[params.categoryName])


    //Load more
    const onFetchMore=async()=>{
        try{
           //get Ref
           const listingsRef=collection(db,'listings')
           const q=query(listingsRef,
               where('type','==',params.categoryName),
               orderBy('timestamp','desc'),
               startAfter(lastFetchedListing),
               limit(10))
           
           const querySnap=await getDocs(q)

           const lastVisible=querySnap.docs[querySnap.docs.length-1]
           setLastFetchedListing(lastVisible)
           
           const listings=[]
           querySnap.forEach((doc)=>{
               return listings.push({
                   id:doc.id,
                   data:doc.data()
               }) 
           })
           

           setListings((prev)=>[...prev,...listings])
           setLoading(false)
       }
       
        catch(error){
           toast.error("error")
        }
    }   



  return (
    <div className='mx-4 my-4 mb-28'>
          <header className='gap-y-4 '>
            <p className='text-3xl font-semibold '>{params.categoryName === 'rent'? t('placesForRent') : t('placesForSale')}</p>
        </header>

        {loading?(
            <Spinner/>
            ): listings.length>0?(
                    <>
                      <main className='gap-y-4'>
                                <ul className='my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                    {listings.map((listing)=>(
                                        <motion.div 
                                        
                                        key={listing.id}
                                        initial={{ opacity: 0,   y: 200 }}
                                        animate={{ opacity: 1 ,y:0}}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                            >
                                        <ListingIte   listing={listing.data} id={listing.id}/>
                                        </motion.div>
                                    ))}
                                    
                                </ul> 
                            </main>

                            {lastFetchedListing &&(
                                <p className='cursor-pointer text-center mx-auto mt-4 px-4 py-1  bg-green-500 w-fit rounded-md text-white'
                                    onClick={onFetchMore}
                                >{t('loadMore')}</p>
                            )}
                    </>
            )
            
            : (<h1>t('NoPlacesWereFoundFor') {params.categoryName === 'rent' ? t('rent') : t('sale')}</h1>)
        }
    </div>
  )
}

export default Category