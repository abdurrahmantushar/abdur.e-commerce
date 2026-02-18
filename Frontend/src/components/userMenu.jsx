import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { LuUserRoundPen } from "react-icons/lu";
import { PiAddressBook } from "react-icons/pi";
import { CgShoppingBag } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";


import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { logout } from '../store/userSlice';
import {AxiosToastError} from '../common config/axiosToastEross'
import { isAdmin } from '../common config/AdminIS';

function UserMenu() {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const user = useSelector((state)=>state.user)
      const orders = useSelector(state => state.order.order); // Redux থেকে orders
      const unreadCount = orders.filter(o => !o.isSeen).length;

    const handleLogout= async()=>{
      try {
        const res = await Axios({
          ...SummaryApi.logout
        })
        if(res.data.success){
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
    <div className="bg-white rounded-xl shadow-xl min-w-56 p-4 border border-gray-100">
      
      <div className="mb-3">
        <div className="text-sm font-semibold font-mono text-gray-700 flex gap-2">
          {user?.name}
          {
            isAdmin (user.role) && (

          <div className=' relative group inline-block:'>
          
          <GrUserAdmin className=' mt-1 text-[15px] text-red-600 cursor-pointer  '/>
          <span className='absolute -top-9 left-1/2 -translate-x-1/2
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
          bg-gray-800 text-white text-xs px-2 py-1 rounded'>
            Admin 
          </span>
          </div> 
            )
          }
          </div>
        <p className="font-semibold text-ellipsis line-clamp-1 text-sm text-gray-800 truncate">
          {user?.email || "user@email.com"}
        </p>
      </div>

      <hr className="my-3" />


      <ul className="space-y-2 text-sm">

        <li>
        <Link to={'/dashboard/my-profile'} className="flex gap-1 text-[15px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
          <LuUserRoundPen className=' mt-0.5 text-[16px]'/>
           Proflie
        </Link>
        </li>
        {
          isAdmin(user.role) && (
            
        <li>
        <Link to={'/dashboard/category'} className="flex gap-1 text-[15px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
          <LuUserRoundPen className=' mt-0.5 text-[16px]'/>
          Category
        </Link>
        </li>
          )
        }
        {
          isAdmin(user.role) && (
            
        <li>
        <Link to={'/dashboard/sub-category'} className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
          <CgShoppingBag className=' mt-0.5 text-[17px]'/>
          Sub-Category
        </Link>
        </li>  
          )
        }
        {
          isAdmin(user.role) && (
            
          <li>
        <Link to={'/dashboard/products'} className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
          <CgShoppingBag className=' mt-0.5 text-[17px]'/>
          Admin-Products
        </Link>
        </li>
          )
        }
        
        {/* <li>
        <Link to={'/dashboard/product'} className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
          <CgShoppingBag className=' mt-0.5 text-[17px]'/>
          Products
        </Link>
        </li> */}
        <li>
        <Link to={'/dashboard/my-orders'} className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
          <CgShoppingBag className=' mt-0.5 text-[17px]'/>
          Orders
        </Link>
        </li>
        {
          isAdmin(user.role) && (
         <li className='relative'>
        <Link to={'/dashboard/user-order'} className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
          <CgShoppingBag className=' mt-0.5 text-[17px]'/>
          Users Orders
        </Link>
         {unreadCount > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {unreadCount}
        </span>
      )}
        </li>
          )
        }

        <li>
        <Link to={'/dashboard/my-address'} className="flex gap-1 text-[16px] px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700">
         <PiAddressBook className=' mt-0.5 text-[19px]'/>
          Address
        </Link>
        </li>

        <hr className="my-2" />

        <button 
        onClick={handleLogout}
        className="text-[15px] px-3 py-2 rounded-lg hover:bg-red-50 cursor-pointer text-red-500 font-medium">
          Logout
        </button>
      </ul>
    </div>
  );
}

export default UserMenu
