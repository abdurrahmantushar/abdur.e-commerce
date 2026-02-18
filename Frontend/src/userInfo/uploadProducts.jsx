import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MdOutlineDeleteSweep } from "react-icons/md";
import { CgClose } from "react-icons/cg";

import { uploadImage } from '../common config/uploadImage'
import Loading from '../common config/loading'
import ViewImage from '../components/viewImage'
import { useSelector } from 'react-redux';
import AddFieldInput from '../components/addFieldInput';
import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';
import { toast } from 'react-toastify';
import SuccessAlert from '../common config/successAlert';

export const  UploadProducts=()=> {

  const navigate = useNavigate()
  const [loading , setLoading] = useState(false)
  const [viewIamge , setViewImage] = useState('')
  const allCategory = useSelector((state) => state.product.allCategory )
  const allSubCategory = useSelector((state)=> state.product.allSubCategory)
  const [selectCategory,setSelectCategory]=useState('')
  const [selectSubCategory, setSelectSubCategory]= useState ('')
  const [OpenAddField , setOpenAddField] = useState(false)
  const [fieldName, setFieldName]= useState('')
  
  const [data,setData]= useState({
    name : '',
    image : [],
    category : [],
    subCategory : [],
    unit : '',
    stock : '',
    price : '',
    discount :'',
    description : '',
    more_details : {},
  })

  const handleChange =(e)=>{
    const {name , value} = e.target
    setData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
  }

  const handleImageUpload= async (e)=>{
    const file = e.target.files[0] 
    setLoading(true)
    if(!file){
      return
    }
    const resData = await uploadImage(file)
    const {data : ImageRes } = resData
    const imageUrl = ImageRes.data.url

    setData((prev)=>{
      return {
        ...prev,
        image : [...prev.image,imageUrl]
      }
    })
    setLoading(false)
  }

  const handleDeleteImage=async(index)=>{

    data.image.splice(index,1)
    setData((prev)=>{
      return{
        ...prev
      }  
    })
  }
  const handleDeleteCategory=(categoryId)=>{
    const index = data.category.findIndex(el => el.id === categoryId)
    data.category.splice(index,1)
    setData((prev)=>{
      return{
        ...prev,
      }
    })
  }
  const handleDeleteSubCategory =async(index)=>{
    data.subCategory.splice(index,1)
    setData((prev)=>{
      return{
        ...prev
      }  
    })
  }
  const handleAddField =()=>{
    setData((prev)=>{
      return{
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName] : ''
        }
      }
    })
    setFieldName('')
    setOpenAddField(false)
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      
      const res = await Axios({
        ...SummaryApi.createProudct,
        data : data
        
      })
      console.log('product Data',data)
      const { data : resData} = res
      if(resData.success){

        SuccessAlert(resData.message)
        setData({
              name : '',
              image : [],
              category : [],
              subCategory : [],
              unit : '',
              stock : '',
              price : '',
              discount :'',
              description : '',
              more_details : {},
        })
        navigate('/dashboard/products')
      }
      
    } catch (error) {
       AxiosToastError(error)
    }
  }
  return (
    <section className='p-2'>
      <div className=' flex p-2 font-semibold bg-gray-200 shadow-lg items-center justify-between px-2'>
        <h2> Upload Products </h2>
      </div>
      <div>
<form 
onSubmit={handleSubmit}
className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow">


  <div>
    <label className="block text-sm font-medium mb-1">Product Name</label>
    <input
      onChange={handleChange}
      type="text"
      value={data.name}
      name='name'
      required
      placeholder="Enter product name"
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Unit</label>
    <input
    onChange={handleChange}
      type="text"
      value={data.unit}
      name='unit'
      placeholder="e.g. 1kg, 500ml"
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Category</label>
            <div className='flex flex-wrap gap-2 p-2'>
              {data.category.map((cat) => (
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
                  onClick={handleDeleteCategory} 
                  className=' m-1 hover:text-gray-700'/>
                </p>
              ))}
            </div>
    <select 
    value={selectCategory}
    onChange={(e)=>{
      const value = e.target.value
      const category = allCategory.find(el => el._id === value)
      setData((prev)=>{
        const exists = prev.category.find(cat => cat._id === category._id)
        if(exists) return prev
        return{
          ...prev,
          category: [...prev.category,category]
        }
      })
      setSelectCategory('')
    }}
    className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-red-400 outline-none">
      
      <option
      required 
      name='category'
      value={''}>Select Category</option>
      {
        allCategory.map((c,index)=>{
          return(
            <option value={c?._id}> {c.name} </option>
          )
        })
      }
    </select>
  </div>


  <div>
    <label className="block text-sm font-medium mb-1">Sub Category</label>
                <div className='flex flex-wrap gap-2 p-2'>
              {data.subCategory.map((cat) => (
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
                  onClick={handleDeleteSubCategory} 
                  className=' m-1 hover:text-gray-700'/>
                </p>
              ))}
            </div>
    <select 
    value={selectSubCategory}
    onChange={(e)=>{
      const value = e.target.value
      const Subcategory = allSubCategory.find(el => el._id === value)
      setData((prev)=>{
        const exists = prev.subCategory.find(cat => cat._id === Subcategory._id)
        if(exists) return prev
        return{
          ...prev,
          subCategory: [...prev.subCategory,Subcategory]
        }
      })
      setSelectSubCategory('')
    }}
    className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-red-400 outline-none">
      <option
      
      name = 'subCategory'
      required
      value={''}>Select Sub Category</option>
      {
        allSubCategory.map((c,index)=>{
          return(
            <option value={c?._id}> {c.name} </option>
          )
        })
      }
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Price</label>
    <input
      onChange={handleChange}
      type="number"
      value={data.price}
      name='price'
      required
      placeholder="৳ Price"
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
    />
  </div>


  <div>
    <label className="block text-sm font-medium mb-1">Discount (%)</label>
    <input
      onChange={handleChange}
      type="number"
      value={data.discount}
      name='discount'
      placeholder="e.g. 10"
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
    />
  </div>

 
  <div>
    <label className="block text-sm font-medium mb-1">Stock</label>
    <input
      onChange={handleChange}
      type="number"
      value={data.stock}
      name='stock'
      required
      placeholder="Available stock"
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Product Images</label>
    {
      loading ? <Loading/> :(

        <input
          onChange={handleImageUpload}
          type="file"
          name='image'
          
          multiple
          className="w-full px-3 py-2 border rounded-lg bg-white"
        />
      )
    }
    {/* upload picture display */}
    <div className=' flex gap-2 mt-2 flex-wrap'>
      {
        data.image.map((img,index)=>{
          return(
            <div key={img+index} className='w-25 h-25 gap-1  border  shadow-2xl relative'>
              <img
              src={img}
              alt={img}
              className='w-full h-full object-scale-down'
              onClick={()=>setViewImage(img)}
              />
              <div className=' absolute bottom-0.5 right-1 top-0  '>
              <MdOutlineDeleteSweep 
              onClick={()=>handleDeleteImage(index)}
              className='rounded-xl cursor-pointer hover:text-red-700  w-4 h-4 '/>
              </div>
            </div>
          )
        })}
    </div>
  </div>


  <div className="md:col-span-2">
    <label className="block text-sm font-medium mb-1">Description</label>
    <textarea
      onChange={handleChange}
      rows="4"
      value={data.description}
      name='description'
      placeholder="Write product description..."
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
    />
  </div>

  <div>
    {
      Object?.keys(data.more_details)?.map((k,index)=>{
        return(
          <div>
            <div>
                <label className="block text-sm font-medium mb-1">{k}</label>
                <input
                  onChange={(e)=>{
                    const value = e.target.value
                    setData((prev)=>{
                      return {
                        ...prev,
                        more_details : {
                          ...prev.more_details,
                          [k]: value
                        }
                      }
                    })
                  }}
                  type="text"
                  value={data.more_details[k]}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                />
            </div>
          </div>
        )
      })
    }
  </div>

    {/* {addField.map((field, index) => (
    <div key={index} className="md:col-span-2">
    <label className="block text-sm font-medium mb-1">
      {field.name}
      </label>
        <MdOutlineDeleteSweep onClick={()=>handleDeleteField(field.name)} />
      {field.type === 'text' && (
      <input
        className="w-full px-3 py-2 border rounded"
        onChange={(e)=>{
          setData(prev => ({
            ...prev,
            more_details: {
              ...prev.more_details,
              [field.name]: e.target.value
            }
          }))
        }}
      />
    )}

    {field.type === 'number' && (
      <input
        type="number"
        className="w-full px-3 py-2 border rounded"
        onChange={(e)=>{
          setData(prev => ({
            ...prev,
            more_details: {
              ...prev.more_details,
              [field.name]: e.target.value
            }
          }))
        }}
      />
    )}

    {field.type === 'select' && (
      <select
        className="w-full px-3 py-2 border rounded"
        onChange={(e)=>{
          setData(prev => ({
            ...prev,
            more_details: {
              ...prev.more_details,
              [field.name]: e.target.value
            }
          }))
        }}
      >
        <option value="">Select</option>
        {field.options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    )}

    {field.type === 'image' && (
      <input
        type="file"
        multiple={field.multiple}
        onChange={async (e)=>{
          const files = [...e.target.files]
          setLoading(true)

          const urls = []
          for (let file of files) {
            const res = await uploadImage(file)
            urls.push(res.data.data.url)
          }

          setData(prev => ({
            ...prev,
            more_details: {
              ...prev.more_details,
              [field.name]: field.multiple ? urls : urls[0]
            }
          }))
          setLoading(false)
        }}
      />
    )}
  </div>
))} */}

      
<div className="md:col-span-2 w-full flex justify-between mt-4">
  <button
    onClick={()=>setOpenAddField(true)}
    type="button"
    className="px-6 py-2 bg-amber-500 hover:bg-amber-700 text-white rounded-lg font-medium"
  >
    Add Field
  </button>

  <button
    type="submit"
    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
  >
    Upload Product
  </button>
</div>


</form>

  </div>
        
        {
          viewIamge &&(
            <ViewImage
            url={viewIamge}
            close={()=>setViewImage('')}
            />
          )
        }
        {
          OpenAddField && (
            <AddFieldInput
            close = {()=>setOpenAddField(false)}
            value ={fieldName}
            onChange={(e)=>setFieldName(e.target.value)}
            submit={handleAddField}
            // onAdd={(field)=>setAddField(prev => [...prev,field])}
            />
          )
        }
    </section>
  )
}


