import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FaUserPlus } from "react-icons/fa6";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";


import logo2 from '../Assests/logo2.png';
import Search from './search';
import { useMobile } from '../hooks/useMobile';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import UserMenu from './userMenu';
import { useGlobalContext } from '../provider';
import DisplaycartItems from './displaycartItems';

export const HeaderBox = () => {
  const navigate = useNavigate()
  const [isMobile]=useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === '/search'
  const user = useSelector((state)=> state?.user)
  const [openUserMenu,setOpenUserMenu]=useState(false)
  const cartItem = useSelector(state => state.cart.cart)
  const {totalPrice,totalQuantity} = useGlobalContext()
  const [openCartSection,setOpenCartSection] = useState(false)


  useEffect(() => {
  setOpenUserMenu(false);
}, [location.pathname]);


  useEffect(() => {
  setOpenUserMenu(false);
  }, [user?._id]);

  const handleMobileIcon=()=>{
    if(!user._id){
      navigate('/login')
      return
    } 
      navigate('/user-m')
  }

  return (
    <header className=' sticky top-0 z-40 no-scrollbar bg-amber-400'>
      {
        !(isSearchPage && isMobile) && (

      <div className=" h-22 lg:h-20 shadow-md  flex items-center justify-between lg:px-10">
      <Link to={'/'} className="flex-shrink-0">
        <img 
          src={logo2} 
          alt="logo" 
          className="hidden lg:block w-64"
        />
        <img 
          src={logo2} 
          alt="logo" 
          className="lg:hidden w-48"
        />
      </Link>


      <div className=' hidden lg:block' >
        <Search />
      </div>
      <div className=''>
        <button  onClick={handleMobileIcon} className='text-4xl text-neutral-600 mr-5 mt-2 lg:hidden'><FaUserPlus /> </button>
        <div className=" items-center lg:gap-8 gap-5 lg:text-lg text-x font-semibold hidden lg:block">
          <div className="cursor-pointer transition flex gap-15">
            {
              user._id ?(
                <div className=' relative'>
                  <div 
                  onClick={()=>setOpenUserMenu(preve => !preve)}
                  className='flex gap-1 mt-4 text-xl font-bold font-mono select-none text-gray-600 hover:text-gray-800'>
                    <p> Account </p>
                    {
                      openUserMenu ? (
                        <IoIosArrowDropupCircle className='mt-1'/>
                      ):(

                        <IoIosArrowDropdownCircle className='mt-1'/>                    
                      )
                    }
                  </div>
                  {
                    openUserMenu && (

                  <div className=' absolute right-0 top-16'> 
                    <div ></div>                     
                    <UserMenu/>
                  </div>
                    )
                  }
                </div>
              ):(

                <Link to={'/login'} className='mt-5 text-gray-700 font-mono text-xl'>login</Link> 
              )
            }
          <button 
          onClick={()=>setOpenCartSection(true)}
          className='flex bg-gray-700 hover:bg-gray-900 text-amber-300 px-2 gap-2 py-2 rounded-md font-mono cursor-pointer'>
            <div>
              <PiShoppingCartSimpleBold className='text-3xl mt-1 animate-bounce duration-500 '/>
            </div>
            <div className='text-sm'>
              {
                cartItem? (
                  <div>
                    <p> {totalQuantity}-Items </p>
                    <p>  {totalPrice} -/ </p>
                  </div>
                ): (

                  <p> My Cart </p>
                )
              }
            </div>
          </button>
          </div>
        </div>
      </div>
      </div>
        )
      }
      <div className='mx-auto px-2 pt-2 lg:hidden pb-4 bg-amber-400'>
        <Search/>
      </div>

      {
        openCartSection && (
          <DisplaycartItems
          close ={()=>setOpenCartSection(false)}
          />
        )

      }
    </header>
  );
};
