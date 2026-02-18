import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from "react-redux";
import { UrlConverter } from '../common config/validUrlConvert';
import CategoryWiseProduct from '../components/CategoryWiseProduct';
import UploadBanner from '../userInfo/uploadBanner';
import { SummaryApi } from '../common config/summayApi';
import { Axios } from '../common config/axiox';

export const HomePage = () => {
  const navigate = useNavigate()
  const loadingCategory = useSelector(state => state.product.loadingState);
  const categoryData = useSelector(state => state.product.allCategory)
  const SubcategoryData = useSelector(state => state.product.allSubCategory)

  const [imageUrl, setImageUrl] = useState("")
  const [showBannerModal, setShowBannerModal] = useState(false)

  const handleRedirectPage = (id, cat) => {
    const subCategory = SubcategoryData.find(sub => {
      const filterData = sub.category.some(el => el._id == id)
      return filterData ? true : null
    })
    const url = `/${UrlConverter(cat)}__${id}`
    navigate(url)
  }

  // Fetch banner from server
  const getBanner = async () => {
    try {
      const res = await Axios({ ...SummaryApi.getBanner })
      if (res.data.success && res.data.data) {
        setImageUrl(res.data.data.image)
      }
    } catch (error) {
      console.log('Banner fetch error')
    }
  }

  useEffect(() => {
    getBanner()
  }, [])

  return (
    <section className="bg-gray-50">

      {/* Banner Section */}
{/* Banner Section */}
<div className="container mx-auto px-2 pt-3 relative hidden lg:block">

  {/* Desktop Banner */}
  <div className="hidden md:block relative w-full h-64 lg:h-72 rounded-2xl overflow-hidden shadow-sm">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt="Desktop Banner"
        className="w-full h-full object-cover rounded-2xl"
      />
    ) : (
      <div className="absolute inset-0 bg-red-700 animate-pulse rounded-2xl" />
    )}

    {/* Edit Button */}
    <button
      onClick={() => setShowBannerModal(true)}
      className="absolute bottom-4 right-4 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg z-20"
    >
      Edit Banner for pc 
    </button>
    

  </div>




</div>
<div className="container mx-auto px-2 pt-3 relative ">

  {/* Desktop Banner */}
  <div className=" relative w-full h-64 lg:h-72 rounded-2xl overflow-hidden shadow-sm">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt="Desktop Banner"
        className="w-full h-full object-cover rounded-2xl"
      />
    ) : (
      <div className="absolute inset-0 bg-red-700 animate-pulse rounded-2xl" />
    )}

    {/* Edit Button */}
    <button
      onClick={() => setShowBannerModal(true)}
      className="absolute bottom-4 right-4 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg z-20"
    >
      Edit Banner for mobile 
    </button>
    

  </div>




</div>


      {/* Banner Modal */}
      {showBannerModal && (
        <UploadBanner close={() => setShowBannerModal(false)} />
      )}

      {/* Categories */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Popular Categories
        </h2>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-10 gap-2">
          {loadingCategory ? (
            new Array(12).fill(null).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-3 shadow-sm hover:shadow transition"
              >
                <div className="bg-gray-200 h-30 rounded-lg animate-pulse" />
                <div className="mt-3 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))
          ) : (
            categoryData.map((cat, index) => (
              <div key={index} className='w-full h-full' onClick={() => handleRedirectPage(cat._id, cat.name)}>
                <div>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className='w-full h-full object-scale-down rounded-xl'
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <h1 className='font-bold text-xl font-mono bg-amber-300/60 px-2'>
        Category wise Product
      </h1>

      {categoryData.map(c => (
        <CategoryWiseProduct
          key={c._id}
          id={c._id}
          name={c.name}
        />
      ))}

    </section>
  )
}
