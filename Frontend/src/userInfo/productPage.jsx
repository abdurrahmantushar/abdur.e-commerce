import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BiSearchAlt } from "react-icons/bi";
import _ from 'lodash';

import { AxiosToastError } from '../common config/axiosToastEross'
import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import Loading from '../common config/loading'
import { toast } from 'react-toastify';
import EditProduct from './editProduct';
import ConfirmBox from '../common config/confirmBos';

export const AdminProductPage = () => {
  const navigate = useNavigate()
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [search , setSearch]= useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [editData,setEditData]= useState()
  const [deleteId, setDeleteId] = useState(null)
  const [openDelteConfirmeBox, setOpenDeleteConfirmBox]= useState (false)

  
  const getProductData = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.getProduct,
        data: { 
          page,
          search
         }
      })

      const { data: resData } = res
      if (resData.success) {
        setProductData(resData.data)
        
        
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
 
  useEffect(() => {
    getProductData()
  }, [page])


  useEffect(()=>{
    let flag = true
    if(flag){
      getProductData()
      flag = false
    }
    const interval = setTimeout(()=>{
  },400);
  return()=>{
    clearTimeout(interval)
  }
  },[search])
  const handleOnChange=(e)=>{
    const {value} =e.target
    setSearch(value)
    setPage(1)

  }
  const handleDeleteProduct =async(id)=>{
    try {
      const res = await Axios({
        ...SummaryApi.deleteProduct,
        data : {_id : id}
      })
      const { data : resData}= res
      if(resData){
        toast.success(resData.message)
        getProductData()
        
        
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  const handleEditProduct = async(id)=>{
    try {
      
    } catch (error) {
      AxiosToastError(error)
    }
  }
  
  return (
    <section className="p-4">

      <div className="flex justify-between items-center mb-4">
        <h2 className="lg:block  hidden text-xl font-semibold">All Products</h2>
            <div className="relative flex items-center w-full md:w-72">
            <BiSearchAlt className="absolute left-3 text-gray-400 text-xl" />

            <input
              onChange={handleOnChange}
              value={search}
              type="text"
              placeholder="Search product..."
              className="lg:w-full pl-10 pr-4 py-2 border border-gray-500 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-red-400
                        placeholder:text-gray-400 shadow-sm"
            />
          </div>

        <button onClick={()=>navigate('/dashboard/upload-products')} className="lg:px-4 lg:py-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
          + Add Product
        </button>
      </div>


      {loading && (
        <Loading/>
      )}


      {!loading && productData.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No products found
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {!loading &&
          productData.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition"
            >
   
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <img
                  src={product?.image?.[0]}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>


              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  ৳ {product.price}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Stock: {product.stock}
                </p>


                <div className="flex justify-between mt-3">
                  <button 
                  onClick={()=>{
                  setEditData(product)  
                  setOpenEdit(true)}}
                  className="text-sm text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button 
                    onClick={() => {
                    setDeleteId(product._id)
                    setOpenDeleteConfirmBox(true)
                    }}
                  className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {!loading && productData.length > 0 && (
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
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}

      {
        openEdit && (
          <EditProduct
          close ={()=>setOpenEdit(false)}
          data = {editData}
          fetchData = {getProductData}
          />
        )
      }
{
  openDelteConfirmeBox && (
    <ConfirmBox
      cancle={() => setOpenDeleteConfirmBox(false)}
      close={() => setOpenDeleteConfirmBox(false)}
      confirm={() => {
        handleDeleteProduct(deleteId)
        setOpenDeleteConfirmBox(false)
        setDeleteId(null)
      }}
    />
  )
}

    </section>
  )
}
