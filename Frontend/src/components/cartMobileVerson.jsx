import React from 'react'
import { useGlobalContext } from '../provider'
import { FiShoppingBag } from "react-icons/fi"
import { FaCaretRight } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


function CartMobileVerson() {
  const { totalPrice, totalQuantity } = useGlobalContext()
  const cartItem = useSelector(state => state.cart.cart)

  return (
    <>
      {
        cartItem[0] && (

          <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t shadow-lg px-4 py-3">

            <div className="flex items-center justify-between gap-4">

              {/* Left side: Cart info */}
              <div className="flex items-center gap-3">
                <div className="bg-red-100 text-red-600 p-2 rounded-full">
                  <FiShoppingBag className="w-6 h-6" />
                </div>

                <div className="flex flex-col leading-tight">
                  <span className="text-x font-semibold text-gray-800">
                    {totalQuantity} items
                  </span>
                  <span className="text-x font-bold text-gray-500">
                    Total: ৳ {totalPrice}
                  </span>
                </div>
              </div>

              {/* Right side: Button */}
              <Link to={'/cart'}
                className="bg-red-500 flex text-white px-5 py-2 rounded-lg text-sm font-semibold
                   hover:bg-red-600 active:scale-95 transition"
              >
                View Cart
                <FaCaretRight className='mt- w-5 h-5' />
              </Link>

            </div>
          </div>
        )
      }
    </>

  )
}

export default CartMobileVerson
