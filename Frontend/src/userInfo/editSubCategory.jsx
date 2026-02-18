import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";
import { toast } from 'react-toastify';
import { AxiosToastError } from '../common config/axiosToastEross';
import { uploadImage } from '../common config/uploadImage';
import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';

const EditSubCategory=({ close,data,fethcData }) =>{
  
  const [subCategoryData,setSubCategoryData] =useState({
    _id:'',
    name : '' ,
    image : '',
    category :[]
  })
  useEffect(()=>{
      if(data && data._id){
        setSubCategoryData({
          _id: data._id,
          name : data.name || '',
          image : data.image || '',
          category : data.category || []
        })
      }
  },[data])
  const [loading,setLoading]= useState(false)
  const allCategory = useSelector((state)=> state.product.allCategory)
  
  const handleChange=(e)=>{
  const {name,value}=e.target
  setSubCategoryData((prev)=>{
      return{
      ...prev,
      [name] : value
      }

    })
    setLoading(false)
  }
  const handleUploadSubCategoryImage =async(e)=>{
    const file = e.target.files[0]
    if(!file){
      return
    }
        const res = await uploadImage(file)
        const imageUrl = res?.data?.data?.url || res?.data?.url
        setSubCategoryData((preve)=>{
          return {
            ...preve,
            image:imageUrl
          }
        })
  }
  const handleDelteCategory =(categoryId)=>{
    const index = subCategoryData.category.findIndex(el=> el._id ===categoryId)
    subCategoryData.category.splice(index,1)
    setSubCategoryData((prev)=>{
      return{
        ...prev
      }
    })
  }
  const handleSubmitCategory =async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData
      })
      const { data : resData} = res
      if (resData.success){
        toast.success(resData.message)
        if (close)close()  
        if(onAddSuccess) onAddSuccess()
        if(fethcData) fethcData()
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <form  onSubmit={handleSubmitCategory}  className='fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50'>
      <div className='bg-white max-w-2xl w-full p-6 rounded-xl shadow-xl text-black'>

        {/* Header */}
        <div className='flex items-center justify-between border-b pb-3 mb-5'>
          <h2 className='text-xl font-semibold'>Edit Sub-Category</h2>
          <CgClose
            onClick={close}
            className='text-red-600 hover:text-red-800 w-6 h-6 cursor-pointer'
          />
        </div>

        {/* Name Field */}
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>
            Sub Category Name
          </label>
          <input
            value={subCategoryData.name}
            onChange={handleChange}
            name='name'
            type="text"
            placeholder='Enter sub category name'
            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
          />
        </div>
        <div className='mb-3 ' >
        <div className='flex flex-wrap gap-2 p-2'>
          {subCategoryData.category.map((cat) => (
            <p
              key={cat._id + 'id'}
              className='
                px-3 py-1
                bg-white
                text-sm font-medium text-gray-700
                rounded-full
                shadow-md
                border border-gray-200
                hover:bg-red-50
                hover:text-red-600
                transition
                cursor-default flex
              '
            >
              {cat.name} 
              <CgClose
              onClick={handleDelteCategory} 
              className=' m-1 hover:text-gray-700'/>
            </p>
          ))}
        </div>

          <select 
          className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none'
onChange={(e) => {
  const value = e.target.value
  const category = allCategory.find(el => el._id === value)

  setSubCategoryData(prev => {
    const exists = prev.category.find(cat => cat._id === category._id)
    if (exists) return prev

    return {
      ...prev,
      category: [...prev.category, category]
    }
  })
}}

          >
             <option value={""}  >  -- Select Category -- </option>
            {
              allCategory.map((category, index)=>{
                return (
                  <option value={ category?._id} key={category?._id+'subCategory'}>
                    {
                      category?.name
                    }
                  </option>
                )
              })
            }
          </select>
        </div>

        {/* Image Field */}
<div>
  <label className='block text-sm font-medium mb-1'>
    Sub Category Image
  </label>

  <label className='relative flex items-center justify-center
    border-2 border-dashed rounded-lg h-40
    bg-gray-50 cursor-pointer hover:bg-gray-100 overflow-hidden'
  >
    {subCategoryData.image ? (
      <img
        
        src={subCategoryData.image}
        alt="category"
        className="absolute inset-0 w-full h-full object-contain p-2  "
      />
    ) : (
      <span className='text-gray-500 text-sm'>
        {
          loading ? 'Uploading...' : 'Click to upload image'
        }
      </span>
    )}

    <input
      
      type="file"
      accept="image/*"
      onChange={handleUploadSubCategoryImage}
      className="hidden"
    />
  </label>
</div>

        {/* Buttons */}
        <div className='flex justify-end gap-3'>
          <button
            className='px-4 py-2 border rounded-lg hover:bg-gray-100'
          >
            Cancel
          </button>
          <button type='submit'
            className='px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
          >
           {
            loading ? 'Uploading.....' :  "Save Sub Category"
           }
          </button>
        </div>

      </div>
    </form>
  )
}

export default EditSubCategory
