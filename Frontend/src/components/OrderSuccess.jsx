import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6">
          Thank you for your purchase.  
          Your order has been confirmed and will be delivered soon.
        </p>

        {/* Order Info Box */}
        <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600 mb-6">
          <p><span className="font-medium">Payment Method:</span> Cash on Delivery</p>
          <p><span className="font-medium">Delivery Time:</span> 3-5 Business Days</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition active:scale-95"
          >
            Continue Shopping
          </Link>

          <Link
            to="/dashboard/my-orders"
            className="border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
          >
            View My Orders
          </Link>
        </div>

      </div>

    </section>
  )
}

export default OrderSuccess
