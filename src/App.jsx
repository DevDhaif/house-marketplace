import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import { ToastContainer,toast  } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/Explore'
import Test from './pages/Test'
import Category from './pages/Category'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Offers from './pages/Offers';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';
import { useEffect } from 'react';
import Logo from './assets/svg/logo.svg?component';
function App() {
useEffect(()=>{
  document.body.dir='ltr'
},[])
  return (
    <>
      <Router>
      <div className='min-h-screen relative container   mx-auto'>
      <div className=" grid place-items-center ltr:ml-8 rtl:mr-8  w-fit px-1 ">
          <Logo className="h12 h-12" />
      </div>
        <Routes>
        
          <Route path='/' element={<Explore/>}/>
          <Route path='/offers' element={<Offers/>}/>
          <Route path='/test' element={<Test/>}/>

          <Route path='/category/:categoryName' element={<Category/>}/>
          <Route path='/profile' element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
          </Route>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path="/create-listing" element={<CreateListing/>}/>
          <Route path="/edit-listing/:listingId" element={<EditListing/>}/>
          <Route path="/category/:categoryName/:listingId" element={<Listing/>}/>
          <Route path="/contact/:lanlordId" element={<Contact/>}/>
        </Routes>
        </div>
        <Navbar/>
      </Router>
      <ToastContainer autoClose={3000}/>
    </>
  )
}

export default App
