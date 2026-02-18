import React from 'react'
import { CgClose } from 'react-icons/cg'
import { FiAlertTriangle } from 'react-icons/fi'

function ConfirmBox({ cancle, confirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">

        {/* Close */}
        <button
          onClick={cancle}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
        >
          <CgClose size={22} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4 text-red-500">
          <FiAlertTriangle size={48} />
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-center mb-2">
          Delete?
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Are you sure you want to delete this category?  
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={cancle}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={confirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmBox
