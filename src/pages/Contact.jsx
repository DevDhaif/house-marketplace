import {useState,useEffect} from 'react'
import { useParams,useSearchParams } from 'react-router-dom'
import {doc,getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast}from 'react-toastify'

function Contact() {
    const [message,setMessage]=useState("")
    const [landlord,setLandlord]=useState({})
    const [searchParams,setSearchParams]=useSearchParams() 

    const params=useParams()

    useEffect(() => {
        const getLandlord=async ()=>{
            const docRef=doc(db,'users',params.lanlordId)
            const docSnap=await getDoc(docRef)

            if(docSnap.exists()){
                setLandlord(docSnap.data())
            }
            else{
                toast.error("Could not get owner data!")
            }
        }
        getLandlord()

    }, [params.lanlordId])
    
    const onChange = (e) => {setMessage(e.target.value)}
    return (
    <div className='p-4 space-y-8'>
        <header className=''>
            <p className='text-xl font-semibold'>Contact Owner</p>
        </header>
        {landlord !== null &&(
            <main className='space-y-8'>
                <div>
                    <p className='font-medium'>Contact {landlord?.name}</p>
                </div>

                <form className='w-full flex-col flex items-center space-y-4'>
                    <div className='flex w-full flex-col space-y-4'>
                        <label htmlFor="message" className=''>Message</label>
                        <textarea 
                        onChange={onChange}
                        name="message" 
                        id="message"  
                        className='resize-none w-full h-56 p-2 outline-none rounded-md'></textarea>
                    </div>
                    <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
            
            <button type='button' className='mx-auto px-12 py-2 rounded-md bg-green-500 text-white '>Send Message</button>
                    </a>
                </form>
                  
            </main>
        )}
    </div>
  )
}

export default Contact