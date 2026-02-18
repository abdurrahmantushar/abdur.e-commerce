import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CgClose } from "react-icons/cg"
import { toast } from 'react-toastify'

import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import { AxiosToastError } from '../common config/axiosToastEross'
import Loading from '../common config/loading'
import { uploadImage } from '../common config/uploadImage'


const EditProduct = ({ close, data, fetchData }) => {

  const [loading, setLoading] = useState(false)
  const allCategory = useSelector(state => state.product.allCategory)
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [selectCategory, setSelectCategory] = useState('')
  const [selectSubCategory, setSelectSubCategory] = useState('')

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    price: '',
    stock: '',
    unit: '',
    description: '',
    image: [],
    category: [],
    subCategory: [],
    discount:''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        _id: data._id,
        name: data.name,
        price: data.price,
        stock: data.stock,
        unit: data.unit,
        description: data.description,
        image: data.image || [],
        category: data.category || [],
        subCategory: data.subCategory || []
      })
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setLoading(true)
      const res = await uploadImage(file)
      const imageUrl = res.data.data.url

      setFormData(prev => ({
        ...prev,
        image: [...prev.image, imageUrl]
      }))
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  const removeImage = (index) => {
    const newImages = [...formData.image]
    newImages.splice(index, 1)
    setFormData({ ...formData, image: newImages })
  }


  const handleSubmit = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.updateProduct,
        data: formData
      })

      if (res.data.success) {
        toast.success('Product updated')
        fetchData()
        close()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg p-5 overflow-y-auto max-h-[90vh]">


        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <button onClick={close} className="text-xl">✕</button>
        </div>


        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          placeholder="Product name"
        />


        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Price"
          />
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Stock"
          />
        </div>
          <input
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="discount"
          />
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>


          <div className="flex flex-wrap gap-2 mb-2">
            {formData.category.map((cat) => (
              <span
                key={cat._id}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
              >
                {cat.name}
                <CgClose
                  className="cursor-pointer hover:text-red-600"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      category: prev.category.filter(c => c._id !== cat._id)
                    }))
                  }}
                />
              </span>
            ))}
          </div>


          <select
            value={selectCategory}
            onChange={(e) => {
              const value = e.target.value
              const category = allCategory.find(c => c._id === value)
              if (!category) return

              setFormData(prev => {
                const exists = prev.category.find(c => c._id === category._id)
                if (exists) return prev
                return {
                  ...prev,
                  category: [...prev.category, category]
                }
              })
              setSelectCategory('')
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
            {allCategory.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sub Category</label>


          <div className="flex flex-wrap gap-2 mb-2">
            {formData.subCategory.map((sub) => (
              <span
                key={sub._id}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
              >
                {sub.name}
                <CgClose
                  className="cursor-pointer hover:text-red-600"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      subCategory: prev.subCategory.filter(s => s._id !== sub._id)
                    }))
                  }}
                />
              </span>
            ))}
          </div>


          <select
            value={selectSubCategory}
            onChange={(e) => {
              const value = e.target.value
              const sub = allSubCategory.find(s => s._id === value)
              if (!sub) return

              setFormData(prev => {
                const exists = prev.subCategory.find(s => s._id === sub._id)
                if (exists) return prev
                return {
                  ...prev,
                  subCategory: [...prev.subCategory, sub]
                }
              })
              setSelectSubCategory('')
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Sub Category</option>
            {allSubCategory.map(sub => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>



        <input
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          placeholder="Unit (kg, pcs, liter)"
        />


        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          placeholder="Product description"
          rows={4}
        />


        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Product Images</p>


          <label className="inline-block mb-3">
            <input
              type="file"
              hidden
              onChange={handleImageUpload}
            />
            <span className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
              Add Image
            </span>
          </label>

          {loading && <Loading />}


          <div className="flex gap-3 flex-wrap mt-2">
            {formData.image.map((img, index) => (
              <div key={img + index} className="relative">
                <img
                  src={img}
                  alt="product"
                  className="w-20 h-20 object-cover border rounded"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>



        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={close}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-5 py-2 bg-red-600 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditProduct
