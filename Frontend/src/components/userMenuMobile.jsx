import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { CgClose } from "react-icons/cg";
import { LuUserRoundPen } from "react-icons/lu";
import { PiAddressBook } from "react-icons/pi";
import { CgShoppingBag } from "react-icons/cg";

import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import { logout } from '../store/userSlice'
import { AxiosToastError } from '../common config/axiosToastEross'
import { isAdmin } from '../common config/AdminIS';

function UserInfoMobile() {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const orders = useSelector(state => state.order.order); // Redux থেকে orders
  const unreadCount = orders.filter(o => !o.isSeen).length;
  
  const handleLogout = async () => {
    try {
      const res = await Axios({ ...SummaryApi.logout })
      if (res.data.success) {
        dispatch(logout())
        localStorage.clear()
        toast.success(res.data.message)
      }
      navigate('/login')
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-[90vw] max-w-xs mx-auto p-4 border border-gray-100">
      
      {/* User Info */}
      <div className="text-center mb-4">
        <button
        onClick={()=> window.history.back()}
        className='block w-fit ml-auto  '><CgClose className='text-2xl text-red-600 '/></button>
        <p className="text-lg font-bold text-gray-800 ">{user?.name}
        </p>

        <p className="text-sm text-gray-500 break-all">
          {user?.email || "user@email.com"}
        </p>
      </div>

      <hr className="mb-3" />

      {/* Menu Items */}
<ul className="text-sm font-medium justify-start">

  {/* Profile */}
  <li>
    <Link
      to="/dashboard/my-profile"
      className="flex gap-1 text-[16px] block w-full px-4 py-3 rounded-xl hover:bg-gray-100 active:bg-gray-200 text-gray-700"
    >
      <LuUserRoundPen className=' mt-0.5 text-[17px]'/>
      Profile
    </Link>
  </li>

  {/* Address */}
  <li>
    <Link
      to="/dashboard/my-address"
      className="flex gap-1 text-[16px] block w-full px-3 py-3 rounded-xl hover:bg-gray-100 active:bg-gray-200 text-gray-700"
    >
      <PiAddressBook className=' mt-0.5 text-[19px]'/>
      Address
    </Link>
  </li>

  {/* Products */}
  {/* <li>
    <Link 
      to={'/dashboard/product'} 
      className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700"
    >
      <CgShoppingBag className=' mt-0.5 text-[17px]'/>
      Products
    </Link>
  </li> */}

  {/* My Orders */}
  <li>
    <Link
      to="/dashboard/my-orders"
      className="flex gap-1 text-[16px] block w-full px-3 py-3 rounded-xl hover:bg-gray-100 active:bg-gray-200 text-gray-700"
    >
      <CgShoppingBag className=' mt-0.5 text-[17px]'/>
      My Orders
    </Link>
  </li>

  {/* ================= ADMIN SECTION ================= */}
  {isAdmin(user.role) && (
    <>
      <hr className="my-3" />

      <li>
        <Link 
          to={'/dashboard/category'} 
          className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700"
        >
          <LuUserRoundPen className=' mt-0.5 text-[16px]'/>
          Category
        </Link>
      </li>

      <li>
        <Link 
          to={'/dashboard/sub-category'} 
          className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700"
        >
          <CgShoppingBag className=' mt-0.5 text-[17px]'/>
          Sub-Category
        </Link>
      </li>

      <li>
        <Link 
          to={'/dashboard/products'} 
          className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700"
        >
          <CgShoppingBag className=' mt-0.5 text-[17px]'/>
          Admin Products
        </Link>
      </li>

      <li className='relative'>
        <Link 
          to={'/dashboard/user-order'} 
          className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700"
        >
          <CgShoppingBag className=' mt-0.5 text-[17px]'/>
          Users Orders
        </Link>

        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </li>
    </>
  )}

  <hr className="my-3" />

  {/* Logout */}
  <li>
    <button
      onClick={handleLogout}
      className="text-[16px] w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 active:bg-red-100 text-red-500 font-semibold"
    >
      Logout
    </button>
  </li>

</ul>
    </div>
  )
}

export default UserInfoMobile
