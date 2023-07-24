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
        <li className='shadow-md relative shadow-gray-400 border-gray-600 overflow-hidden  h-full  rounded-lg flex flex-col '>
            <Link to={`/category/${listing.type}/${id}`} className='w-full  flex flex-col gap-y-2'>
                <img className='w-full h-36 object-contain max-h-full' src={listing.imgUrls[0]} alt={listing.name} />
                <div className='flex flex-col gap-y-4 mx-4 py-4'>
                    <p className='text-gray-700 text-xs font-semibold'>{listing.location}</p>
                    <p className='text-lg font-semibold font-serif'>{listing.name}</p>
                    <p className='text-sm font-semibold text-blue-500 '>$ {listing.offer ?
                        listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                        {listing.type === "rent" ? `/ ${t('month')}` : ""}
                    </p>
                    <p>{listing.currency}</p>
                    <div className='flex gap-x-4 px-4 py-2 bg-blue-100/80 outline w-fit  rounded-md outline-1 outline-blue-300'>
                        <FaBed size={25} />
                        <p >{listing.bedrooms}</p>
                        <BathtubIcon />
                        <p >{listing.bathrooms}</p>
                    </div>

                </div>


            </Link>
            {onEdit && (
                <FaEdit
                    className='absolute bottom-5 mb-0.5 fill-blue-700 hover:fill-blue-500 hover:scale-125 ltr:right-8 rtl:left-8 cursor-pointer'
                    size={18}
                    onClick={() => onEdit(id)} />

            )}
            {onDelete && (
                <AiFillDelete
                    className='absolute ltr:right-2 rtl:left-2 bottom-5 fill-red-700 hover:fill-red-500 hover:scale-125 cursor-pointer'
                    size={20}
                    onClick={() => onDelete(listing.id, listing.name)} />
            )}


        </li>
    )
}

export default ListingIte