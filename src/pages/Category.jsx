import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection,getDocs,query,where,orderBy,limit,startAfter}  from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingIte from '../components/ListingIte'
import { motion } from "framer-motion"


function Category() {
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
        <header className='space-y-4 '>
            <p className='text-3xl font-semibold '>Places for {params.categoryName === 'rent'? 'rent':'sale'}</p>
        </header>

        {loading?(
            <Spinner/>
            ): listings.length>0?(
                    <>
                            <main className='space-y-4'>
                                <ul className='my-8 grid grid-cols-1 md:grid-cols-4 gap-4'>
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
                                <p className='cursor-pointer text-center mx-auto mt-4 px-4 py-0.5 bg-green-500 w-28 rounded-md text-white'
                                    onClick={onFetchMore}
                                >Load More</p>
                            )}
                    </>
            )
            
            : (<h1>No places for {params.categoryName} were found</h1>)
        }
    </div>
  )
}

export default Category