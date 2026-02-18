import React, { useEffect, useRef, useState } from 'react'
import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from "react-icons/io5"

import CardLoading from '../frontPage/cardLoading'
import { AxiosToastError } from '../common config/axiosToastEross'
import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import CardProduct from './cardProduct'

function CategoryWiseProduct({ id, name = '' }) {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null)

  const fetCategoryWiseData = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id }
      })
      const { data: resData } = res
      if (resData.success) {
        setData(resData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleScrollLeft=()=>{
    containerRef.current.scrollBy({left:-300, behavior: 'smooth'})
  }
  const handleScrollRight=()=>{
    containerRef.current.scrollBy({left:300, behavior : 'smooth'})
  }
  useEffect(() => {
    if (id) {
      fetCategoryWiseData()
    }
  }, [id])

  const loadingCard = new Array(7).fill(null)
    if (data.length === 0) {
    return null   // 🔥 এইটা করলে empty category দেখাবে না
  }

  return (
    <section className="my-8">
      <div className="flex items-center justify-between px-4 mb-3">
        <h1 className="font-bold text-xl font-mono text-gray-700">
          {name}
        </h1>

        <div className="flex gap-2 ">
          <button 
           onClick={handleScrollLeft}
            className="
              text-4xl text-gray-600
              hover:text-amber-500
              transition
              active:scale-95
            "
          >
            <IoArrowBackCircleOutline />
          </button>

          <button
            onClick={handleScrollRight}
            className="
              text-4xl text-gray-600
              hover:text-amber-500
              transition
              active:scale-95
            "
          >
            <IoArrowForwardCircleOutline onClick={handleScrollLeft} />
          </button>
        </div>
      </div>


      <div className="flex gap-4 px-4 overflow-x-auto scroll-smooth no-scrollbar" ref={containerRef}>
        {loading &&
          loadingCard.map((_, index) => (
            <CardLoading key={index} />
          ))
        }

        {!loading &&
          data.map((p, index) => (
            <CardProduct
              data={p}
              key={p._id + index}
            />
          ))
        }
      </div>
    </section>
  )
}

export default CategoryWiseProduct
