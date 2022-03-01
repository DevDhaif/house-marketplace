import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection,getDocs,query,where,orderBy,limit,startAfter}  from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingIte from '../components/ListingIte'


function Category() {
    const [listings,setListings]=useState([])
    const [loading,setLoading]=useState(true)

    const params=useParams()

    useEffect(()=>{
        
     const fetchListings=async()=>{
         try{
            //get Ref
            const listingsRef=collection(db,'listings')

            const q=query(listingsRef,
                where('type','==',params.categoryName),
                orderBy('timestamp','desc'),
                limit(10))
            
            const querySnap=await getDocs(q)
            
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
    },[])
  return (
    <div className='mx-4 mt-4'>
        <header className='space-y-4 '>
            <p className='text-3xl font-semibold '>Places for {params.categoryName === 'rent'? 'Rent':'Sale'}</p>
        </header>

        {loading?(
            <Spinner/>
            ): listings.length>0?(
                    <>
                            <main>
                                <ul className='mt-8 flex flex-col '>
                                    {listings.map((listing)=>(
                                        <ListingIte key={listing.id} listing={listing.data} id={listing.id}/>
                                    ))}
                                </ul> 
                            </main>
                    </>
            )
            
            : (<h1>No places for {params.categoryName} were found</h1>)
        }
    </div>
  )
}

export default Category