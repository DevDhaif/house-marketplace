import {Link} from 'react-router-dom'
import RentImage from '../assets/jpg/rentCategoryImage.jpg'
import SellImage from '../assets/jpg/sellCategoryImage.jpg'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'
import { useState } from 'react'


function Explore() {
 
  return (
    <div id="explore" className='mx-4 min-h-screen'>
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
      <div className='h-56 w-12/12'>
                <MapContainer style={{height:'100%',width:'100%'}} 
                center={[15.601709540371429,33.517728805542]}
                zoom={10}
                scrollWheelZoom={true}>

                <TileLayer  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'/>
                <Marker draggable  eventHandlers={{
                  click: (e) => {
                    console.log('marker clicked', e.latlng)
                  },
                }}   position={[17.601709540371429,32.517728805542]}>
                    <Popup >yes</Popup>
                    
                </Marker>
                </MapContainer>
            </div>
    </div>
  )
}

export default Explore