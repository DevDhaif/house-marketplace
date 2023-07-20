import { useState,useEffect,useRef } from 'react'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {doc,updateDoc, getDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
import {useNavigate,useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import {v4 as uuidv4} from 'uuid'
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer, 
  } from 'react-leaflet'
import Listing from './Listing'
import { useTranslation } from 'react-i18next'

function EditListing() {
    const {t} =  useTranslation();
    const [geoLocationEnabled,setGeoLocationEnabled]=useState(false)
    const [loading,setLoading]=useState(false)
    const [listing,setListing]=useState(false)
const[formData,setFormData]=useState({
    type:"rent",
    name:'',
    bedrooms:1,
    bathrooms:1,
    parking:false,
    furnished:false,
    address:'',
    offer:false,
    regularPrice:51,
    discountedPrice:50,
    images: {},
    latitude:15.508457,
    longitude:32.522854

})
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude
} =formData

    const auth=getAuth()
    const navigate=useNavigate()
    const params=useParams()
    const isMounted=useRef(true)





    useEffect(()=>{
        if(listing && listing.userRef !== auth.currentUser.uid){
            toast.error("You can`t edit this!")
            navigate('/')
        }
    },[])

    useEffect(()=>{
        setLoading(true)
        const fetchListing=async()=>{

            const docRef=doc(db,'listings',params.listingId)
            const docSnap=await getDoc(docRef)

            if(docSnap.exists()){
                setListing(docSnap.data())
                setFormData({...docSnap.data(),address:docSnap.data().location})
                setLoading(false)
            }
            else{
                navigate('/')
                toast.error(t('listingDoesNotExist'))
            }
        }
        fetchListing()
    },[params.listingId,navigate])


    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth,(user)=>{
                if(user){
                    setFormData({...formData,userRef:user.uid})
                }
                else{
                    navigate('/sign-in')
                }
            })
        }
        return ()=>{
            isMounted.current = false
        }
        // eslint-disable-nextline react-hooks/exhaustive-deps
    },[isMounted])

    

    const onSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)


        if(discountedPrice >= regularPrice ){
            setLoading(false)
            toast.error(t('discountPriceToast'))
            return
        }

        if(images.length >6){
            setLoading(false)
            toast.error(t('imagesError'))
            return
        }

        //manage location
        let geoLocation={}
        let location

        if(geoLocationEnabled){
            const res=await fetch(`https://maps.google.com/maps/api/geocode/json?address=${address}
            &key=AIzaSyAj1lg0Thhg1wWSABx9pe61HJteo4ysLII`)

            const data=await res.json()

        }
        else{
            geoLocation.lat=latitude
            geoLocation.lng=longitude
        }

        //Store image in firebase
        const storeImage=async(image)=>{
            return new Promise ((resolve, reject)=>{
                const storage=getStorage()
                const fileName=`${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef=ref(storage,'images/'+fileName)

                const uploadTask=uploadBytesResumable(storageRef,image)

                uploadTask.on(
                    'state_changed',
                    (snapshot)=>{
                        const progress=
                            (snapshot.bytesTransferred/snapshot.totalBytes)*100
                            console.log('Upload is '+ progress+ ' % done');
                            switch(snapshot.state){
                                case 'paused':
                                    console.log('paused');
                                    break;
                                case 'running':
                                    console.log('running');
                                    break;
                            }
                    },
                    (error)=>{
                        reject(error)
                    },
                    ()=>{
                        getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL)=>{
                            resolve(downloadURL)
                        })
                    }
                )

              })
        }

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))   
        ).catch(()=>{
            setLoading(false)
            toast.error(t('imagesNotUploaded'))
            return
        })


        

        const formDataCopy={
            ...formData,
            imgUrls,
            geoLocation,
            timestamp:serverTimestamp()
        }
        
        formDataCopy.location=address
        delete formDataCopy.images
        delete formDataCopy.address

        !formDataCopy.offer &&(delete formDataCopy.discountedPrice)

        const docRef=doc(db,'listings',params.listingId)

        await updateDoc(docRef,formDataCopy)

        setLoading(false)

        toast.success("Listing saved")
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)

    }

    const onMutate=(e)=>{
        
       let boolean=null
       
       if(e.target.value === "true"){
        boolean=true
       }
       else if(e.target.value === "false"){
        boolean=false
       }


       if(e.target.files){
           setFormData((prev)=>({
               ...prev,
               images:e.target.files
           }))
       }

       if(!e.target.files){
           if(typeof e.latlng === "object"){
            setFormData((prev)=>({
                ...prev,
                latitude:e.latlng.lat,
                longitude:e.latlng.lng,
            }))
           }
           else{
        setFormData((prev)=>({
            ...prev,
            [e.target.id]:boolean ?? e.target.value
        }))}
       }
    }


    if(loading){
        return <Spinner/>
    }
    return (
    <div className='w-full   px-4'>
        <header>
            <p className='text-2xl font-semibold'>{t('editListing')}</p>
        </header>

        <main >

            <form onSubmit={onSubmit} className="mt-4 flex flex-col  space-y-2 ">

                <label htmlFor="" className='font-medium '>{t('sale') / t('rent')}</label>
                <div className='flex space-x-4 px-2 mt-1 '>
                    <button 
                    type='button' 
                    className={`  font-semibold px-6 py-1 shadow-md shadow-gray-300  bg-white rounded-lg ${type==='sale'?'bg-green-500 text-white':'bg-white'}`}
                    id="type"
                    value="sale"
                    onClick={onMutate}>
                    {t('sale')}
                     </button>
                    <button type='button' 
                    className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${type==='rent'?'bg-green-500 text-white':'bg-white'} `}
                    id="type"
                    value="rent"
                    onClick={onMutate}>
                    {t('rent')}
                    </button>
                </div>

                <label htmlFor="" className='font-medium'>{t('name')}</label>
                <input
                className='w-2/3 p-1 rounded-md border-none outline-none' 
                type="text"
                id='name'
                value={name}
                onChange={onMutate}
                maxLength='32'
                minLength='10'
                required  />
            

            <div className=' flex mt-4 space-x-4'>
                <div className=' flex flex-col space-y-1'>
                    <label htmlFor="" className='font-medium '>{t('bathrooms')}</label>
                    <input 
                    className='w-12 py-1 text-center rounded-md border-none outline-none'
                    type="number"
                    id='bathrooms'
                    value={bathrooms}
                    onChange={onMutate}
                    min='1'
                    max='50'
                    required />
                </div>

                <div className=' flex flex-col space-y-1'>
                    <label htmlFor="" className='font-medium '>{t('bedrooms')}</label>
                    <input 
                    className='w-12 py-1 text-center rounded-md border-none outline-none'
                    type="number"
                    id='bedrooms'
                    value={bedrooms}
                    onChange={onMutate}
                    min='1'
                    max='50'
                    required />
                </div>
            </div>

            <label htmlFor="" className='block mt-4 font-medium '>{t('parkingSpot')}</label>
            <div className='flex space-x-4 px-2 mt-1 '>
                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${parking?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='parking'
                value={true}
                onClick={onMutate}
                >
                {t('yes')}
                </button>

                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${!parking && parking!== null?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='parking'
                value={false}
                onClick={onMutate}
                >
                {t('no')}
                </button>
            </div>

            <label htmlFor="" className='block mt-4 font-medium '>{t('furnished')}</label>
            <div className='flex space-x-4 px-2 mt-1 '>
                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${furnished?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='furnished'
                value={true}
                onClick={onMutate}
                >
                {t('yes')}
                </button>

                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${!furnished && furnished!== null?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='furnished'
                value={false}
                onClick={onMutate}
                >
                {t('no')}
                </button>
            </div>

            <label htmlFor="" className='block mt-4 font-medium '>{t('address')}</label>
            <textarea
            className='w-2/3 rounded-lg mt-2'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            required
            />

           

            <label htmlFor="" className='block mt-4 font-medium '>{t('locationOnMap')}</label>
            <div className='h-56 w-12/12'>
            <MapContainer style={{height:'100%',width:'100%'}} 
            
            center={[latitude,longitude]}
            zoom={8}
            scrollWheelZoom={true}>

            <TileLayer  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'/>
            <Marker  draggable  eventHandlers={{
                
              mouseover: (e) => onMutate(e)
            }}   position={[latitude,longitude]}>
                <Popup >{Listing.location}</Popup>
                
            </Marker>
            </MapContainer>
        </div>


            <label htmlFor="" className='block mt-4 font-medium '>{t('offer')}</label>
            <div className='flex space-x-4 px-2 mt-1 '>
                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${offer?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='offer'
                value={true}
                onClick={onMutate}
                >
                {t('yes')}
                </button>

                <button 
                className={`px-6 py-1 font-semibold rounded-lg shadow-md shadow-gray-300 ${!offer && offer!== null?'bg-green-500 text-white':'bg-white'}`}
                type='button'
                id='offer'
                value={false}
                onClick={onMutate}
                >
                {t('no')}
                </button>
            </div>


            <label htmlFor="" className='block mt-4 font-medium '>{t('regularPrice')}</label>
            <div className='flex items-center  space-x-2'>
                <input 
                type="number" 
                className='w-24 py-1 text-center rounded-md border-none outline-none'
                id={"regularPrice"}
                value={regularPrice}
                onChange={onMutate}
                min='50'
                max='75000000'
                required
                />
                {type==='rent' && (
                    <p className='font-medium'> $ / {t('month')}</p>
                )}
            </div>

            {offer &&(
                <div>
                <label htmlFor="" className='block mt-4 font-medium '>{t('discountPrice')}</label>
                <div className='flex items-center  space-x-2'>
                    <input 
                    type="number" 
                    className='w-18 py-1 text-center rounded-md border-none outline-none'
                    id={"discountedPrice"}
                    value={discountedPrice}
                    onChange={onMutate}
                    min='50'
                    max='75000000'
                    required={offer}
                    />
                </div>
                </div>
            )}


            <label htmlFor="" className='block mt-4 font-medium '>{t('images')}</label>
            <p className='my-2'>{t('imagesLimit')}</p>
            <input
            className='file:mr-2  w-full file:px-2 file:py-1 px-4 py-2 file:font-medium bg-white rounded-md file:bg-green-500 file:border-none file:text-white file:rounded-lg' 
            type="file"
            id="images"
            onChange={onMutate}
            max="6"
            accept='.jpg,.png,.jpeg'
            multiple
            required
            />
            
            <div className='w-full flex items-center'>
                <button className='mt-8 px-4 py-1 bg-green-500 text-white font-medium rounded-md shadow-md shadow-gray-300 w-2/3 mx-auto' type="submit">{t('edit')}</button>
            </div>
            
            </form>
        </main>
    </div> 
    )
}

export default EditListing