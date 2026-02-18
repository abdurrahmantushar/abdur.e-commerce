import React, { useEffect, useState } from 'react'
import { AxiosToastError } from '../common config/axiosToastEross'
import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import { useParams } from 'react-router-dom'
import Loading from '../common config/loading'
import CardProduct from './cardProduct'

function ProductListPage() {
  const Params = useParams()
  const [loading, setLoading] = useState(false)
  const [subCategories, setSubCategories] = useState([])
  const [products, setProducts] = useState([])

  const categoryId = Params.category?.split('__').pop() || ''

  const getCategoryWiseData = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.getproductAndSubCategoryByCategory,
        data: { id: categoryId }
      })

      if (res.data.success) {
        setSubCategories(res.data.data.subCategories)
        setProducts(res.data.data.product)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategoryWiseData()
  }, [categoryId])

  return (
    <section className="min-h-screen bg-gray-100 p-4">
      {loading && <Loading />}

      {!loading &&
        subCategories.map(subCat => {
          
          const subCatProducts = products.filter(p =>
            p.subCategory.includes(subCat._id)
          )

          if (!subCatProducts.length) return null

          return (
            <div key={subCat._id} className="mb-10">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                {subCat.name}
              </h3>

              <div className="flex gap-4 px-4 overflow-x-auto scroll-smooth no-scrollbar">
                {subCatProducts.map(product => (
                  <CardProduct key={product._id} data={product} />
                ))}
              </div>
            </div>
          )
        })}
    </section>
  )
}

export default ProductListPage
