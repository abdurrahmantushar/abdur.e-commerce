import React, { useState } from 'react'
import { useGlobalContext } from '../provider'
import AddAddress from './addAddress'
import { useSelector } from 'react-redux'
import { AxiosToastError } from '../common config/axiosToastEross'
import { Axios } from '../common config/axiox'
import { SummaryApi } from '../common config/summayApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js'

function CheckOutPage() {
const { totalPrice, totalQuantity ,notDiscountPrice ,getCartDetails} = useGlobalContext()
const [openAddress,setOpenAddress] = useState(false)
const addressList = useSelector(state=>state.addresses.addressList)
const [selectedAddress,setSeletedAddress] = useState(0)
const [paymentMehtod,setPaymentMethod] = useState('payment')
const cartItem = useSelector(state=>state.cart.cart)
const navigate = useNavigate()


const DeliveryFee = 15

const handleCashOnDelivery = async()=>{
  try {
    const res= await Axios({
      ...SummaryApi.cashOnDelivery,
      data:{

        list_item : cartItem ,
        adressId : addressList[selectedAddress]?._id,
        totalAmt : totalPrice + DeliveryFee,
        subTotalAmt : totalPrice 
      }
    })
    const {data : resData}= res
    if(resData.success){
      toast.success('Order confirm')
      if(getCartDetails){
        getCartDetails()
      }
      navigate('/order-success')
    }
    
  } catch (error) {
    AxiosToastError(error)
  }
}
const handleOnlinePayment = async () => {
  try {
    const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    if (!stripePublicKey) {
      toast.error("Stripe public key missing!");
      return;
    }

    const res = await Axios.post("/api/order/checkout", {
      list_item: cartItem,
      adressId: addressList[selectedAddress]?._id,
      totalAmt: totalPrice + DeliveryFee,
      subTotalAmt: totalPrice,
    });

    const { url } = res.data;
    if (!url) {
      toast.error("Stripe session creation failed");
      return;
    }

    console.log("Redirecting to Stripe checkout URL:", url);
    window.location.href = url;

  } catch (err) {
    console.log("Stripe handle error:", err);
    AxiosToastError(err);
  }
};

const handlePlaceOrder =()=>{
  if (!addressList[selectedAddress]){
    toast.error('Please select and address')
    return
  }
  if (paymentMehtod === 'cod'){
    handleCashOnDelivery()
  } else if (paymentMehtod === 'online'){
    handleOnlinePayment()
  }
}
  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Choose your address
            </h3>

              {
                addressList.map((address , index)=>{
                  return (
                    <label htmlFor={'address'+index} key={index} className={`gap-5 mb-2 ${!address.status && 'hidden'}`}>

                <div  className="border rounded-lg p-4 mb-2 flex justify-between items-center hover:border-red-400 cursor-pointer">
                <div>
                <p className="font-medium text-gray-800"> {address.city} </p>
                  <p className="text-sm text-gray-500">
                   Country : {address.country}
                </p>
                <p className="text-sm text-gray-500">
                   Exact loaction : {address.adress_line}
                </p>
                 <p className="text-sm text-gray-500">
                   Postel Code: {address.pincode}
                </p>
                <p className="text-sm text-gray-500"> mobile: +880 {address.mobile}</p>
              </div>
                    <div>

                  <input type="radio"
                  id={'address'+index} 
                  value={index} 
                  onChange={(e)=>setSeletedAddress(e.target.value)} name='address'/>
                    </div>
                </div>
                    </label>
                  )
                })
              }

            <button 
            onClick={()=>setOpenAddress(true)}
            className="mt-4 w-full border-2 border-dashed border-gray-300
                               py-3 rounded-lg text-sm text-gray-600
                               hover:border-red-400 hover:text-red-500 transition">
              + Add New Address
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Payment Method
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:border-red-400">
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when you receive</p>
                </div>
                <input onChange={(e)=>setPaymentMethod(e.target.value)} type="radio" name="payment" value={'cod'} checked={paymentMehtod === 'cod'} />
              </label>

              <label className="flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:border-red-400">
                <div>
                  <p className="font-medium">Online Payment</p>
                  <p className="text-sm text-gray-500">Bkash / Nagad / Card</p>
                </div>
                <input  onChange={(e)=>setPaymentMethod(e.target.value)}  type="radio" name="payment" value={'online'} checked={paymentMehtod === 'online'} />
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h3>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items </span>
              <span>{totalQuantity} pcs </span>
            </div>

            <div className="flex justify-between">
              <span>Items Total</span>
              <span>৳ {totalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>৳ {DeliveryFee}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- {notDiscountPrice - totalPrice} </span>
            </div>
          </div>

          <div className="border-t mt-4 pt-3 flex justify-between font-semibold">
            <span>Total Payable</span>
            <span className="text-red-500">৳ {totalPrice+ DeliveryFee } </span>
          </div>

          <button 
          onClick={handlePlaceOrder}
          className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg
                             hover:bg-red-600 active:scale-95 transition">
            Place Order
          </button>
        </div>

      </div>
      {
        openAddress && (
          <AddAddress
          close = {()=>setOpenAddress(false)}
          />
        )
      }
    </section>
  )
}

export default CheckOutPage
