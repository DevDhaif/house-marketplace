import {Link} from 'react-router-dom'
import RentImage from '../assets/jpg/rentCategoryImage.jpg'
import SellImage from '../assets/jpg/sellCategoryImage.jpg'

function Explore() {
  return (
    <div id="explore" className='mx-4'>
      <header>
        <p className='text-3xl font-semibold'>Explore</p>
      </header>

      <main className=''>
        <p>Categoriez</p>
        
        <div className='flex space-x-4 justify-between w-full'>
          <Link to='/category/rent' className="space-y-2">
            <img src={RentImage} alt="rent" className='w-44 h-32 object-cover rounded-xl' />
            <p>Places for Rent</p>
          </Link>

          <Link to='/category/sale' className="space-y-2">
            <img src={SellImage} alt="sell" className='w-44 h-32 object-cover rounded-xl'/>
            <p>Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore