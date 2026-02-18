import React, { useEffect, useState } from 'react'
import {createColumnHelper, flattenBy} from '@tanstack/react-table'
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TbPencil } from "react-icons/tb";
import AddSubCategory from './addSubCategory'
import { AxiosToastError } from '../common config/axiosToastEross'
import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import ProductTable from '../components/productTable'
import ViewImage from '../components/viewImage'
import EditSubCategory from './editSubCategory';
import ConfirmBox from '../common config/confirmBos';
import { toast } from 'react-toastify';

export const SubCategory=()=> {
  const columnHelper = createColumnHelper()
  const [addOPenSub,setOpenSub] = useState(false)
  const [data , setData] = useState([])
  const [ loading , setLoading] = useState(false)
  const [imageUrl, setImageUrl]= useState('')
  const [openEdit,setOpenEdit] = useState(false)
  const [editData , setEditData] = useState ({
    _id : ""
  })
  const [delteSubCate,setDeleteSubCate] = useState({
    _id : ''
  })
  const [openDelteConfirmeBox, setOpenDeleteConfirmBox]= useState (false)
  const getSubCategory =async()=>{
    try {
      setLoading(true)
      const res = await Axios ({
        ...SummaryApi.getSubCategory,

      })
      const { data : resData}= res
      if (resData.success){
        setData(resData.data)
      }
      
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  

  
  const column = [
    columnHelper.accessor('name',{
      header : 'Name'
    }),
      columnHelper.accessor('image',{
      header : 'Image',
      cell : ({row})=>{
        
        return <img 
        src={row.original.image}
        alt={row.original.name}
        className='w-20 h-20'
        onClick={()=>{
          setImageUrl(row.original.image)
        }}
        /> 
      }
    }),
    columnHelper.accessor('category', {
    header: 'Category',
    cell: ({ row }) => {
    const categories = row.original.category
    if (!categories || categories.length === 0) return '—'

    return categories.map(cat => cat.name).join(', ')
    }
    }),
    columnHelper.accessor("_id",{
      header: 'Action',
      cell : ({row})=>{
        return(
          <div className='flex gap-5'>
            <button onClick={()=>{
              setOpenEdit(true) 
              setEditData(row.original)
              

            }}>
              <TbPencil className=' w-6 h-6'/>
            </button>
            <button 
            onClick={()=>{
              setOpenDeleteConfirmBox(true)
              setDeleteSubCate(row.original)
            }}
            >
              <MdOutlineDeleteSweep className=' w-6 h-6'/>
            </button>
          </div>
        )
      }
    })


  ]
    useEffect(()=>{
    getSubCategory()
  },[])

  const handleDeleteSubCategory=async()=>{
    try {
      const res = await Axios({
        ...SummaryApi.deleteSubCategory,
        data:delteSubCate
      })
      const {data:resData}= res

      if(resData){
        toast.success(resData.message)
        getSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCate({_id: ''})
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
 <section className='p-2'>
      <div className=' flex p-2 font-semibold bg-gray-200 shadow-lg items-center justify-between px-2'>
        <h2> Sub-Category </h2>
        <button
        onClick={()=>setOpenSub(true)} 
        className="text-[15px] px-3 py-2 rounded-lg bg-red-500 hover:bg-red-900 cursor-pointer text-white font-medium"> Add sub-Category</button>
        </div>

        <div>
            <ProductTable
            data={data}
            column={column}
            />
        </div>

        {
          addOPenSub && (
            <AddSubCategory
            close ={()=>setOpenSub(false)}
            onAddSuccess = {getSubCategory}
            />
          )
        }
        {
          imageUrl &&
          <ViewImage
          url={imageUrl}
          close ={()=>{
            setImageUrl('')
          }}
          />
        }

        {
          openEdit &&
          <EditSubCategory
          fethcData = {getSubCategory}
          data = {editData}
          close = {()=>{
           
            setOpenEdit(false)
          }}
          />
          
        }
        {
          openDelteConfirmeBox && (
            <ConfirmBox
            cancle={()=>setOpenDeleteConfirmBox(false)}
            close = {()=>setOpenDeleteConfirmBox(false)}
            confirm={handleDeleteSubCategory}/>
          )
        }
        </section>
  )
}


