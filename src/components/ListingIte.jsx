import React from 'react'
import {Link} from 'react-router-dom'
import BedIcon from '../assets/svg/bedIcon.svg?component';
import BathtubIcon from '../assets/svg/bathtubIcon.svg?component';
import { list } from 'postcss';


function ListingIte({listing,id,onDelete})   {
  return (
    <li>
        <Link to={`/category/${listing.type}/${id}`} className='w-full flex justify-between '>
            <img className='w-20  rounded-lg max-h-full' src={listing.imageUrls[0]} alt={listing.name} />
            <div className='space-y-1 '>
            <p className='text-gray-700 text-xs font-semibold'>{listing.location}</p>
            <p className='text-lg font-semibold font-serif'>{listing.name}</p>
                <p className='text-sm font-semibold text-green-500 '>$ {listing.offer?
                     listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') 
                     :listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    }
                    {listing.type === "rent" ? " / Month":""}
                </p>
                <div className='flex space-x-3'>
                    <BedIcon />
                    <p >{listing.bathrooms}{listing.bathrooms>1?` bedrooms`:' bedroom'}</p>
                    <BathtubIcon/>
                    <p >{listing.bathrooms}{listing.bathrooms>1?` bathrooms`:' bathroom'}</p>
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