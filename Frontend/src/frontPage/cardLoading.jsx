import React from 'react'

function CardLoading() {
  return (
    <div className="w-48 lg:w-60 bg-white rounded-xl shadow p-3 animate-pulse">
      
      {/* Image / Time Section */}
      <div className="h-36 bg-gray-200 rounded-lg mb-3"></div>

      {/* Name Section */}
      <div className="h-4 bg-gray-200 rounded mb-2 w-4/5"></div>

      {/* Price Section */}
      <div className="h-4 bg-gray-200 rounded mb-3 w-2/5"></div>

      {/* Add / Action Section */}
      <div className="h-8 bg-gray-300 rounded-lg w-full"></div>

    </div>
  )
}

export default CardLoading
