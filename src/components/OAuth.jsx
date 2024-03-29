import {useLocation,useNavigate} from 'react-router-dom'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {doc,setDoc,getDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
import GoogleIcon from '../assets/svg/googleIcon.svg?component';
import { async } from '@firebase/util'
import { useTranslation } from 'react-i18next'

function OAuth() {
    const {t} = useTranslation();
    const navigate=useNavigate()
    const location=useLocation()


    const onGoogleClick= async()=>{
        try{
            const auth=getAuth()
            const provider=new GoogleAuthProvider()
            const result=await signInWithPopup(auth,provider)
            const user=result.user

            const docRef=doc(db,'users',user.uid)
            const docSnap=await getDoc(docRef)

            if(!docSnap.exists()){
                await setDoc(doc(db,'users',user.uid),{
                    name:user.displayName,
                    email:user.email,
                    timestamp:serverTimestamp()
                })
            }
            navigate('/')
        }
        catch(error){
            toast.error("Could not authorized with google")
        }
    }
  return (
      <div className='mt-8 justify-center flex flex-col items-center gap-y-2'>
    <p> {location.pathname === '/sign-up'?t('signupWith'):t('signInWith')}</p>

    <button onClick={onGoogleClick}>
            <GoogleIcon className="w-8 h-8"/>
        </button>
    </div>
  )
}

export default OAuth