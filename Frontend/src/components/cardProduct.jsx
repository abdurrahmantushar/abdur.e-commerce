import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UrlConverter } from '../common config/validUrlConvert'
import { AxiosToastError } from '../common config/axiosToastEross'

import AddToCardButtom from '../common config/addToCardButtom'

function CardProduct({ data }) {
  const url = `product/${UrlConverter(data.name)}-${data._id}`



  return (
    <Link
      to={url}
      className="w-60 bg-white rounded-xl shadow p-3 flex-shrink-0"
    >
      {/* Image */}
      <img
        src={data?.image?.[0] || 'https://via.placeholder.com/150'}
        alt={data?.name}
        className="h-36 w-full object-contain rounded-lg mb-3"
      />

      {/* Name */}
      <h3 className="text-sm font-semibold mb-1 line-clamp-2">
        {data?.name || 'No Name'}
      </h3>

      {/* Price */}
      <p className="text-red-600 font-bold mb-2">
        ৳ {data?.price || 'N/A'}
      </p>

        {data.unit && (
        <span className="text-x font-bold text-gray-500">
         {data.unit}
        </span>
        )}
       <div>
        
        {
          data.stock == 0 ? (
            <p className='  '> out of stock </p>
          ):(
            <AddToCardButtom
            data={ data }

            />
          )
        }
        </div> 
    </Link>
  )
}

export default CardProduct
