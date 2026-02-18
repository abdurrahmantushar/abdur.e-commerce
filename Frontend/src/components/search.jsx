import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import { useMobile } from "../hooks/useMobile";

function Search() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSearchPage, setIsSearchPage] = useState(false)
  const [isMobile] = useMobile()
    const params = useLocation()
    const search = params?.search?.slice(3)

  useEffect(() => {
    setIsSearchPage(location.pathname === '/search')
  }, [location])

  const redirectSearchPage = () => {
    navigate('/search')
  }

  const handleOnChange =(e)=>{
      const value = e.target.value

      const url = `/search?q=${value}`
      navigate(url)
  }
  return (
    <div className=' w-full min-w-[100px] lg:min-w-[620px] h-11 flex lg:h-12 rounded-2xl border-2 overflow-hidden focus-within:border-red-500  text-neutral-500 bg-gray-100  tansition duration-1000'>
      <div className=" flex mb-2 h-full p-2  gap-3 w-full group ">
        <div className=" flex">
          {
            (isMobile && isSearchPage) ? (
              <Link to={'/'}>
                <IoArrowBack className=" text-2xl mt-0.5 bg-white rounded-full shadow-md group-focus-within:text-red-500 " />
              </Link>
            ) : (
              <button className="group-focus-within:text-red-500">
                <BiSearchAlt className=" text-2xl" />
              </button>
            )
          }
        </div>
        <div className="w-full h-full">
          {
            !isSearchPage ? (
              <div
                onClick={redirectSearchPage}
                className="font-mono">
                <TypeAnimation
                  sequence={[
                    
                    'We produce "Milk"..',
                    1000,
                    'We produce "Baby Items"',
                    1000,
                    'We produce "Personal Care items" ',
                    1000,
                    'Lets Search for shopping...',
                    1000,
                  ]}
                  speed={50}
                  style={{ fontSize: '1.3em' }}
                  repeat={Infinity}
                />
              </div>
            ) : (
              <div>
                <input type="text"
                  defaultValue={search}
                  onChange={handleOnChange}
                  placeholder="Search for baby items & others"
                  className="w-full h-full text-xl outline-none bg-transparent "
                />
              </div>
            )
          }
        </div>

      </div>

    </div>
  )
}

export default Search
