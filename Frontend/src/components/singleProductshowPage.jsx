import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosToastError } from '../common config/axiosToastEross'
import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import { priceWithDiscount } from '../common config/discountCompo'
import AddToCardButtom from '../common config/addToCardButtom'

function SingleProductshowPage() {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(0)
  const [data, setData] = useState({
    name: '',
    image: [],
    description: '',
    price: 0,
    unit: '',
    stock: 0,
    discount: ''
  })
  const { productSlug } = useParams()
  let productId = productSlug.split('-').slice(-1).pop()


  const getSingleProductDetails = async () => {
    if (!productId) return
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.getSingleProductDetails,
        data: { productId },
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

  useEffect(() => {
    getSingleProductDetails()
  }, [params])

  return (
    <section className="container mx-auto bg-amber-100/30 h-full w-full p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-30">

        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg flex items-center justify-center h-[250px] lg:h-[450px] overflow-hidden">
            <img
              src={data.image[image]}
              alt="product"
              className="w-full h-full object-contain py-2"
            />
          </div>
          <div className='flex justify-center items-center gap-3 mt-5'>
            {
              data.image.map((img, index) => {
                return (
                  <div key={img + index + '1'} className={`bg-gray-100 w-5 h-5 rounded-full ${index === image && 'bg-gray-400'}`}>

                  </div>
                )
              })
            }
          </div>
          <div className='flex justify-center items-center gap-2 shadow mt-2 overflow-x-auto'>
            {
              data.image.map((img, index) => {
                return (
                  <div key={img + index + '1'}>
                    <img
                      alt='images'
                      src={img}
                      className='border lg:w-40 lg:h-30'
                      onClick={() => setImage(index)}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5 space-y-4">

          <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">
            {data.name}
          </h1>


          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">

              <span className="text-2xl font-bold text-red-600">
                ৳ {data.discount
                  ? priceWithDiscount(data.price, data.discount)
                  : data.price}
              </span>


              {data.discount && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="line-through text-gray-400">
                    ৳ {data.price}
                  </span>

                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                    {data.discount}% OFF
                  </span>
                </div>
              )}
            </div>

            {data.unit && (
              <span className="text-sm text-gray-500">
                / {data.unit}
              </span>
            )}
          </div>


          <div>
            {data.stock > 0 ? (
              <span className="text-sm font-medium text-green-600">
                ✔ In Stock
              </span>
            ) : (
              <span className="text-sm font-medium text-red-500">
                ❌ Out of Stock
              </span>
            )}
          </div>


          {data.description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.description}
            </p>
          )}


          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Quantity : </span>
            <div className="flex items-center border px-4 rounded">
              {data.stock}
            </div>
          </div>


          <div className=" gap-3 pt-2 px-2">
            <AddToCardButtom data={data} />
          </div>

        </div>


      </div>
    </section>

  )
}

export default SingleProductshowPage
