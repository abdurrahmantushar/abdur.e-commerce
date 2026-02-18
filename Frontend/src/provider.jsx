import { createContext,useContext, useEffect, useState } from "react";
import { Axios } from "./common config/axiox";
import { SummaryApi } from "./common config/summayApi";
import { toast } from "react-toastify";
import { AxiosToastError } from "./common config/axiosToastEross";
import { handleAddItemCart } from "./store/cartProdcutSlice";
import { useDispatch, useSelector } from "react-redux";
import { priceWithDiscount } from "./common config/discountCompo";
import { handleAddAddress } from "./store/addressSlice";
import { handleOrder } from "./store/orderSlice";

export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider =({children})=>{
  const [totalPrice,setTotalPrice] = useState(0)
  const [totalQuantity,setTotalQuantity] = useState(0)
  const [notDiscountPrice,setNotDiscountPrice] = useState(0)
  const cartItem = useSelector(state => state.cart.cart)
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()

  const getCartDetails = async()=>{
      try {
        const res = await Axios({
          ...SummaryApi.getCardDetails
        })

        const { data : resData} = res
        if(resData.success){
          dispatch(handleAddItemCart(resData.data))
         

        }
      } catch (error) {
        // AxiosToastError(error)
      }
    }
  const updateQty =async(id,qty)=>{
    try {
      const res = await Axios({
        ...SummaryApi.updateCartQuentity,
        data : {
          _id : id ,
          qty : qty
        }
      })

      const {data : resData } = res

      if(resData.success){
        getCartDetails()
        return resData
      }
    } catch (error) {
      // AxiosToastError(error)
      // return error
    }
  }
  const deleteCartItem = async(cartId)=>{
    try {
      const res = await Axios({
        ...SummaryApi.deleteCartItem,
        data : {
          _id : cartId
        }
      })
      const {data : resData} = res
      if(resData.success){
        toast.success(resData.message)
        getCartDetails()
        return { success: true } 
      }
    } catch (error) {
      // AxiosToastError(error)
      // return error
    }
  }
  
    useEffect(()=>{
      
        getCartDetails()
        
    },[])
useEffect(() => {
  const totalQuantity = cartItem.reduce(
    (sum, item) => sum + (item.quentity || 0),
    0
  )
  const totalPrice = cartItem.reduce(
    (sum, item) =>
      sum + (priceWithDiscount(item?.productId?.price,item.productId.discount )* (item.quentity || 0)),
    0
  )
  setTotalQuantity(totalQuantity)
  setTotalPrice(totalPrice)

  const noDiscountPrice = cartItem.reduce((sum,item)=>
    sum+(item?.productId?.price * (item.quentity || 0)),
  0)
  setNotDiscountPrice(noDiscountPrice)
 
}, [cartItem])

const handleLogoutCart=()=>{
  // localStorage.clear()
  dispatch(handleAddItemCart([]))
}

const getAddress =async()=>{
  try {
    const res = await Axios({
      ...SummaryApi.getAddress
    })
    const {data : resData} = res
    if(resData.success){
      dispatch(handleAddAddress(resData.data))
    }
  } catch (error) {
    AxiosToastError(error)
  }
}
const getOrder = async()=>{
  try {
    const res = await Axios({
      ...SummaryApi.getOrderDetails
    })
    const {data : resData} = res
    if(resData.success){
      dispatch(handleOrder(resData.data))
    }
  } catch (error) {
    // AxiosToastError(error)
  }
}

useEffect(()=>{
getCartDetails()
handleLogoutCart()
getAddress()
getOrder()
},[user])
    return(
    <GlobalContext.Provider value={{ getCartDetails,updateQty, deleteCartItem,totalPrice, totalQuantity,notDiscountPrice,getAddress,getOrder}}>
        {children}
    </GlobalContext.Provider>
    )
}

export default GlobalProvider