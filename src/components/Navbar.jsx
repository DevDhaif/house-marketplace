import {useNavigate, useLocation} from 'react-router-dom'

import OfferIcon from '../assets/svg/localOfferIcon.svg?component';
import ExploreIcon from '../assets/svg/exploreIcon.svg?component';
import ProfileIcon from '../assets/svg/personOutlineIcon.svg?component';

function Navbar  () {
    const navigate=useNavigate()
    const location=useLocation()

    const pathMatchRoute=(route)=>{
        if(route === location.pathname){
            return true
        }
    }
  return (
    <footer className=' bottom-0 left-0 right-0  h-20 z-50 flex justify-center items-center mt-12 sticky  w-full py-1 bg-gray-200  '>
        <nav className='w-screen overflow-y-hidden'>
            <ul className='flex justify-around'>
                <li onClick={()=>navigate('/offers')}>
                    <OfferIcon className={`${pathMatchRoute('/offers')? 'fill-teal-800':'' } h-12 w-12`}  /> 
                    <p className={`${pathMatchRoute('/offers')? 'text-teal-800' : ''}`}>Offers</p>
                </li>
            
               
            
                <li onClick={()=>navigate('/')}>
                    <ExploreIcon className={`${pathMatchRoute('/')? 'fill-teal-800':'' } h-12 w-12`} />
                    <p className={`${pathMatchRoute('/')? 'text-teal-800' : ''}`}>Explore</p>

                </li>
                <li onClick={()=>navigate('/profile')}>
                    <ProfileIcon className={`${pathMatchRoute('/profile')? 'fill-teal-800':'' } h-12 w-12`} />
                    <p className={`${pathMatchRoute('/profile')? 'text-teal-800' : ''}`}>Profile</p>

                </li>
            </ul>
        </nav>
    </footer>
  )
}


export default Navbar;
