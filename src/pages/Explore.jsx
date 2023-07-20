import {Link} from 'react-router-dom'
import RentImage from '../assets/jpg/rentCategoryImage.jpg'
import SellImage from '../assets/jpg/sellCategoryImage.jpg'
// import useTranslation from 'react-i18next'
import Slider from '../components/Slider'
import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next'


function Explore() {
  const { t } = useTranslation()
  return (
    <div id="explore" className='mx-4 min-h-screen px-4'>
      <header>
        <p className='text-3xl font-semibold'>{t('explore')}</p>
      </header>

      <Slider/>
      <main className='my-4'>
        <p className='text-2xl font-medium '>{t('categories')}</p>
        
        <div className='my-4 flex space-x-4 justify-between w-full'>
        <motion.div 
        className="space-y-4 w-full text-center "
        initial={{ opacity: 0,   x:  900 ,y:300}}
        animate={{ opacity: 1 ,x:0,y:0}}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}>
        <Link to='/category/rent' className="space-y-2">
        <img src={RentImage} alt="rent" className='w-full h-2/3 object-cover  rounded-xl' />
              <p> {t('placesForRent')}</p>
        </Link>
        </motion.div>

        <motion.div 
        className="space-y-2 w-full  text-center"
        initial={{ opacity: 0,   x:  -900 ,y:300}}
        animate={{ opacity: 1 ,x:0,y:0}}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}>
          <Link to='/category/sale' className="space-y-2">
            <img src={SellImage} alt="sell" className='w-full h-2/3 object-cover rounded-xl'/>
              <p > {t('placesForSale')}</p>
          </Link>
          </motion.div>
        </div>

      </main>
      
    </div>
  )
}

export default Explore