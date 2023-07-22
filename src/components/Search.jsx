import  {useState,useEffect, useContext} from 'react'
import { HouseContext } from '../context/HouseContext'
import { db } from '../firebase.config'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
// import 'firebase/firestore';

const Search = ({listings, setListings}) => {
    const [searchTerm,setSearchTerm]=useState('');
    const [searchResults,setSearchResults]=useState([]);
    // const {setListings}=useContext(HouseContext);
    const params=useParams();

    useEffect(()=>{
        //  search for the searchTerm in the listings
        const fetchListings=async()=>{
            try{
               //get Ref
               const listingsRef=collection(db,'listings')
               const q=query(listingsRef,
                   where('type','==',params.categoryName),
                   orderBy('timestamp','desc'))
               
               const querySnap=await getDocs(q)
   
               
               const listings=[]
               querySnap.forEach((doc)=>{
                   return listings.push({
                       id:doc.id,
                       data:doc.data()
                   }) 
               })
               
   
               console.log(listings);
           }
           
            catch(error){
               toast.error("error")
            }
        }   
        fetchListings();
    },[]);
    const seacrh=(searchTerm)=>{
        console.log("old listings");
        console.log(listings);
        if(searchTerm===''){
            setListings(listings);
            return;
        }
        else if(listings.length===0){
            return;
        }
        else {
            console.log("searching");

            const newSearchResults=listings.filter((listing)=>{
                return listing.data.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
    
            setListings(newSearchResults);
        }
        setSearchResults(newSearchResults);
        console.log(newSearchResults);
    }
    const handleInpuChange = (e) =>{
        setSearchTerm(e.target.value);
        seacrh(e.target.value);
    }
  return (
    <div>
        <input 
         className='w-56 px-4 py-2 bg-gray-800 text-white rounded' type='text' value={searchTerm} onChange={handleInpuChange} />
    </div>
  )
}

export default Search