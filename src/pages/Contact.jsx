import {useState,useEffect} from 'react'
import { useParams,useSearchParams } from 'react-router-dom'
import {doc,getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast}from 'react-toastify'
import { useTranslation } from 'react-i18next'

function Contact() {
    const { t } = useTranslation();
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
                toast.error(t('couldNotGetOwnerData'))
            }
        }
        getLandlord()

    }, [params.lanlordId])
    
    const onChange = (e) => {setMessage(e.target.value)}
    return (
        <div className='p-4 gap-y-8'>
        <header className=''>
                <p className='text-xl font-semibold'> {t('contactOwner')}</p>
        </header>
        {landlord !== null &&(
                <main className='gap-y-8'>
                <div>
                        <p className='font-medium'>{t('contact')} {landlord?.name}</p>
                </div>

                    <form className='w-full flex-col flex items-center gap-y-4'>
                        <div className='flex w-full flex-col gap-y-4'>
                            <label htmlFor="message" className=''>{t('message')}</label>
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
            
                            <button type='button' className='mx-auto px-12 py-2 rounded-md bg-green-500 text-white '>{t('sendMessage')}</button>
                    </a>
                </form>
                  
            </main>
        )}
    </div>
  )
}

export default Contact