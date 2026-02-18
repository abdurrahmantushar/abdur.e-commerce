import React, { useEffect, useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import { LuMinus } from "react-icons/lu";


import { useGlobalContext } from '../provider'
import { SummaryApi } from './summayApi'
import { Axios } from './axiox'
import { toast } from 'react-toastify'
import { AxiosToastError } from './axiosToastEross'
import Loading from './loading'
import { useSelector } from 'react-redux'

function AddToCardButtom({data}) {
const { getCartDetails,updateQty,deleteCartItem } = useGlobalContext()
const [loading ,setLoading ] = useState(false)
const cartItem = useSelector(state => state.cart.cart)
const [isAvailableCart,setIsAvailableCart] = useState(false)
const [qty,setQty] = useState(0)
const [cartItemDetail,setCartItemDetails] = useState()

  const handleAddToCart=async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.addToCart,
        data : {
          productId : data?._id,
        }
      })
      const {data : resData} = res
      if(resData.success){
        
        getCartDetails()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally{
        setLoading(false)
    }
  }
  useEffect(()=>{
    const checkItemCart = cartItem.some(item => item.productId?._id === data._id)
      setIsAvailableCart(checkItemCart)
      const product = cartItem.find(item => item.productId?._id === data._id)
      setQty(product?.quentity)
      setCartItemDetails(product)
  },[data,cartItem])

  const increamentQty = async (e)=>{
    e.preventDefault()
    e.stopPropagation()
   const res= await updateQty(cartItemDetail?._id,qty+1)
   if(res.success){
    toast.success('Item Added')
   }
    
  }
  const decreamentQty = async (e)=>{
    e.preventDefault()
    e.stopPropagation()
    if(qty === 1){
      deleteCartItem(cartItemDetail?._id)
      if(res.success){
      toast.info('Item Removed')
      getCartDetails() 
    }

      getCartDetails()
      
    } else{

      const res = updateQty(cartItemDetail?._id,qty-1)
      if(res.success){
        toast.success('Item Removed')
    }
    }
    
  }
  return (
    <div>
        {
             isAvailableCart ? (
                <div className='flex justify-center items-center gap-4 text-xl ml-15 '>
                    <button onClick={decreamentQty}>
                        <LuMinus className='w-9 h-9 bg-red-400 rounded shadow cursor-pointer hover:bg-red-500' />
                    </button>
                    <p> {qty} </p>
                    <button onClick={increamentQty}> <IoIosAdd className='w-9 h-9 bg-green-600 rounded shadow cursor-pointer hover:bg-green-700'/> </button>
                </div>
             ):(

        <button 
        onClick={handleAddToCart}
        className="w-full text-sm bg-red-500 text-white py-1.5 rounded-lg hover:bg-red-600">
          {
            loading ? <Loading/> : 'Add to cart '
          }       
      </button>
             )
        }
    </div>
  )
}

export default AddToCardButtom
