import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BedIcon from '../assets/svg/bedIcon.svg?component';
import BathtubIcon from '../assets/svg/bathtubIcon.svg?component';
import { list } from 'postcss';
import { FaBed, FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';


function ListingIte({ listing, id, onDelete, onEdit }) {
    const { t } = useTranslation();
    return (
        <li className='shadow-md relative shadow-gray-400 border-gray-600 overflow-hidden    rounded-lg flex flex-col '>
            <Link to={`/category/${listing.type}/${id}`} className='w-full  space-y-4'>
                <img className='w-full h-36 object-contain max-h-full' src={listing.imgUrls[0]} alt={listing.name} />
                <div className='space-y-1 mx-4 py-4'>
                    <p className='text-gray-700 text-xs font-semibold'>{listing.location}</p>
                    <p className='text-lg font-semibold font-serif'>{listing.name}</p>
                    <p className='text-sm font-semibold text-green-500 '>$ {listing.offer ?
                        listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                        {listing.type === "rent" ? `/ ${t('month')}` : ""}
                    </p>
                    <div className='flex space-x-4'>
                        <FaBed size={25} />
                        <p >{listing.bedrooms}{listing.bedrooms > 1 ? t('bedrooms') : t('bedroom')}</p>
                        <BathtubIcon />
                        <p >{listing.bathrooms}{listing.bathrooms > 1 ? t('bathrooms') : t('bathroom')}</p>
                    </div>

                </div>


            </Link>
            {onEdit && (
                <FaEdit
                    className='absolute bottom-5 mb-0.5 fill-green-700 hover:fill-green-500 hover:scale-125 right-8'
                    size={18}
                    onClick={() => onEdit(id)} />

            )}
            {onDelete && (
                <AiFillDelete
                    className='absolute right-2 bottom-5 fill-red-700 hover:fill-red-500 hover:scale-125 cursor-pointer'
                    size={20}
                    onClick={() => onDelete(listing.id, listing.name)} />
            )}


        </li>
    )
}

export default ListingIte