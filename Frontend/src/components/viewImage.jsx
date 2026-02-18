import React from 'react'
import { CgClose } from 'react-icons/cg';
function ViewImage({url,close}) {
  return (
    <div className='  flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-gray-800/40'>
      <div className='  w-[40%] h-[60%]  p-4 flex justify-between bg-white gap-2 shadow-lg rounded-lg'>
        <img 
        src={url} 
        alt="name"
        className=' w-[45%] h-[90%] mt-7 shadow-gray-600 shadow-xl rounded-xl' />
        <CgClose 
        className='text-red-600 w-7 h-7 cursor-pointer hover:text-red-800'
        onClick={close}
        />
      </div>
    </div>
  )
}

export default ViewImage