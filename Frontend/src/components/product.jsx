import React, { useEffect, useState } from 'react'
import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import { AxiosToastError } from '../common config/axiosToastEross'
import Loading from '../common config/loading'

function UserProduct() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page , setPage]= useState(1)
  const [totalPages,setTotalPages]=useState([1])


  const getProducts = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page
        }
      })

      const { data: resData } = res
      if (resData.success) {
        setProducts(resData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [page])
const handleNext=()=>{
    if(page !== totalPages)
    setPage(prev => prev +1)
}
  return (
    <section className="p-4">

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Our Products
        </h2>
        <p className="text-sm text-gray-500">
          Discover quality products
        </p>
      </div>

      {/* Loader */}
      {loading && (
        <Loading/>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Image */}
            <div className="h-40  flex items-center justify-center">
              <img
                src={product.image?.[0]}
                alt={product.name}
                className="h-full object-contain hover:scale-105 transition"
              />
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                {product.name}
              </h3>

              <div className=" gap-1 mt-1">
                <p className="">
                  =/ {product.price}
                </p>

                {product.discount > 0 && (
                  <p className="text-xs text-gray-400 line-through">
                    ৳ {product.price + product.discount}
                  </p>
                )}
              </div>

              <button
                className="
                  w-full mt-3 py-2 text-sm
                   text-black
                  rounded-lg hover:bg-gray-300/40 transition
                "
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Product */}
      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No products found 😢
        </p>
      )}
        {!loading && products.length > 0 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Prev
          </button>

          <span className="px-3 py-1 border rounded bg-gray-100">
            {page}
          </span>

          <button
            onClick={handleNext}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}

export default UserProduct
