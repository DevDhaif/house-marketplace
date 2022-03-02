import React from 'react'
import {Link} from 'react-router-dom'
import BedIcon from '../assets/svg/bedIcon.svg?component';
import BathtubIcon from '../assets/svg/bathtubIcon.svg?component';
import { list } from 'postcss';
import { FaBed } from 'react-icons/fa';


function ListingIte({listing,id,onDelete})   {
  return (
    <li className='shadow-md shadow-gray-400 border-gray-600 overflow-hidden    rounded-lg flex flex-col '>
        <Link to={`/category/${listing.type}/${id}`} className='w-full  space-y-4'>
            <img className='w-full h-36 object-cover max-h-full' src={listing.imageUrls[0]} alt={listing.name} />
            <div className='space-y-1 mx-4 py-4'>
            <p className='text-gray-700 text-xs font-semibold'>{listing.location}</p>
            <p className='text-lg font-semibold font-serif'>{listing.name}</p>
                <p className='text-sm font-semibold text-green-500 '>$ {listing.offer?
                     listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') 
                     :listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    }
                    {listing.type === "rent" ? " / Month":""}
                </p>
                <div className='flex space-x-4'>
                    <FaBed size={25}/>
                    <p >{listing.bathrooms}{listing.bathrooms>1?` Bedrooms`:' Bedroom'}</p>
                    <BathtubIcon />
                    <p >{listing.bathrooms}{listing.bathrooms>1?` Bathrooms`:' Bathroom'}</p>
                </div>

            </div>

            
        </Link>
            {/**
                {onDelete && (
                    <DeleteIcon onClick={()=>onDelete(listing.id,listing.name)}/>
                    )}
            */}

            
    </li>
  )
}

export default ListingIte