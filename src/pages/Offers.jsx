import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection,getDocs,query,where,orderBy,limit,startAfter}  from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingIte from '../components/ListingIte'


function Offers() {
    const [listings,setListings]=useState([])
    const [loading,setLoading]=useState(true)

    const params=useParams()

    useEffect(()=>{
        console.log(params);

     const fetchListings=async()=>{
         try{
            //get Ref
            const listingsRef=collection(db,'listings')
            const q=query(listingsRef,
                where('offer','==',true),
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
            toast.error(`${error}`)
         }
     }   

     fetchListings()
    },[])

  return (
    <div className='mx-4 my-4 mb-28'>
        <header className='space-y-4 '>
            <p className='text-3xl font-semibold '>Offers</p>
        </header>

        {loading?(
            <Spinner/>
            ):listings && listings.length>0?(
                    <>
                            <main>
                                <ul className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-2'>
                                <ListingIte key={listings[0].id} listing={listings[0].data} id={listings[0].id}/>

                                    {listings.map((listing)=>(
                                        <ListingIte key={listing.id} listing={listing.data} id={listing.id}/>
                                    ))}
                                </ul> 
                            </main>
                    </>
            )
            
            : (<h1>No offers were found</h1>)
        }
    </div>
  )
}

export default Offers