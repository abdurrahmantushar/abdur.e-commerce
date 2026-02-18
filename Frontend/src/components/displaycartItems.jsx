import React from 'react'
import {Link, useNavigate}from 'react-router-dom'
import { FaCaretRight } from "react-icons/fa";

import { IoClose } from "react-icons/io5"
import { useGlobalContext } from '../provider'
import { useSelector } from 'react-redux'
import AddToCardButtom from '../common config/addToCardButtom'
import { priceWithDiscount } from '../common config/discountCompo'
import imageEmpty from '../Assests/empty_cart.webp'
import crying from '../Assests/crying.png'
import { toast } from 'react-toastify';

function DisplaycartItems({ close }) {
  const { totalPrice, notDiscountPrice,totalQuantity } = useGlobalContext()
  const cartItem = useSelector(state => state.cart.cart)
  const savedAmount = notDiscountPrice - totalPrice
  const user = useSelector(state=>state.user)
  const navigate = useNavigate()
  const redirectToCheckOutPage=()=>{
    if(user?._id){
      navigate('/check-out')
      if(close){
        close()
      }
      return
    }
    toast('Please Login')
    navigate('/login')
  }
  return (
    <section
      className="fixed inset-0 z-50 bg-black/60 flex justify-end"
      onClick={close} 
    >
      {/* Drawer */}
      <div
        className="w-full sm:w-[420px] h-full bg-amber-100 shadow-xl flex flex-col animate-slideIn rounded"
        onClick={e => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 shadow-xl">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
          <Link className='lg:hidden' to={'/'}> <IoClose className="w-6 h-6 text-gray-600" />  </Link>
          <button
            onClick={close}
            className="p-2 rounded-full hover:bg-gray-100 hidden lg:block"
          >
            <IoClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {cartItem.length === 0 ? (
            <div className="text-center text-gray-400  py-20 ">
              <p className='text-xl'>  No Item Here 
              <img
              className='w-20 h-20 ml-40'
              src={crying}
              alt={crying}
              />

              </p>
              <Link className='text-2xl cursor-pointer lg:hidden' to={'/'} >  Go and Shopping... </Link>
             <button className='text-2xl cursor-pointer hidden lg:block ml-25' onClick={close} >  Go and Shopping... </button>
              <img src={imageEmpty} alt={imageEmpty} />
            </div>
          ) : (
            cartItem.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-center border-b pb-3"
              >
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={item.productId?.image?.[0] || 'https://via.placeholder.com/150'}
                    alt={item.productId?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {item.productId?.name}
                  </p>

                  {item.productId?.unit && (
                    <span className="text-xs text-gray-500">{item.productId.unit}</span>
                  )}

                  {/* Price + Discount */}
                  <div className="flex items-center gap-2 mt-1">
                    {item.productId?.discount > 0 && (
                      <span className="line-through text-gray-400 text-sm">
                        ৳ {item.productId.price}
                      </span>
                    )}

                    <span className="text-red-600 font-bold text-sm">
                      ৳ {priceWithDiscount(item.productId.price, item.productId.discount)}
                    </span>

                    {item.productId?.discount > 0 && (
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold text-xs">
                        {item.productId.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity button */}
                <div>
                  <AddToCardButtom data={item.productId} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Savings */}
        {savedAmount > 0 && (
          <div className=" h-30 bg-amber-200/30 text-gray-700 text-sm font-medium py-2  ">
            <div className='flex justify-between px-5 '>
            <span>Orginal Price :</span>
            <span> {notDiscountPrice} </span>
            </div>
            <div className='flex justify-between px-5'>
              <span> Total Quantity :</span>
              <span> {totalQuantity} </span>
            </div>
            <div className='flex justify-between px-5'>
              <span> Delivery Charge :</span>
              <span>  15 </span>
            </div>
            <div className='flex justify-between px-5'>
              <span> Total Price :</span>
              <span>  {totalPrice} </span>
            </div>
          </div>
        )}
          {
            cartItem[0] && (

        <div className="border-t px-4 py-3 space-y-3">
          <button
            onClick={redirectToCheckOutPage}
            className="w-full bg-red-500 text-white py-2 px-2  rounded-lg
                       hover:bg-red-700 active:scale-95 transition flex justify-between"
          >
           <span>{totalPrice}৳ </span>
          <span className='flex'> Proceed to Checkout<FaCaretRight className='mt-1.5 hover:text-gray-700'/></span >
          </button>
        </div>
            )
          }
       
      </div>
    </section>
  )
}

export default DisplaycartItems
