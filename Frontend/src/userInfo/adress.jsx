import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoAdd } from "react-icons/io5"
import { MdDeleteOutline } from "react-icons/md";
import { TiEdit } from "react-icons/ti";

import AddAddress from '../components/addAddress'
import { EditAddres } from '../components/editAddress';
import { AxiosToastError } from '../common config/axiosToastEross';
import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../provider';

export const MyAdress = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEdit,setOpenEdit] = useState(false)
  const [editAddressDetails,setEditAddressDetails] = useState(null)
    const { getAddress} = useGlobalContext()


  const handleDisbledAddress = async(id)=>{
    try {
      const res = await Axios({
        ...SummaryApi.deleteAddress,
        data : {
          _id : id
        }
      })
      const {data : resData} = res
      if(resData.success){
        toast.success('Address Removed')
        if(getAddress){
          getAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className="bg-white rounded-xl shadow p-5">


      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          My Addresses
        </h2>

        <button
          onClick={() => setOpenAddress(true)}
          className="flex items-center gap-1 text-sm font-medium
                     text-red-500 border border-red-500
                     px-3 py-1.5 rounded-lg
                     hover:bg-red-500 hover:text-white transition"
        >
          <IoAdd className="w-4 h-4" />
          Add Address
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addressList?.map((address, index) => (
          
          <div
            key={index}
            className= {`border rounded-lg p-4 cursor-pointer
                       hover:border-amber-200 hover:bg-red-50/40
                       transition active:scale-[0.99] ${!address.status && 'hidden'}`}
          >
            <div className="font-semibold text-gray-800 mb-1 flex justify-between ">
              {address.city}
             <p className='flex gap-2'>
              <MdDeleteOutline onClick={()=>handleDisbledAddress(address._id)} className='w-6 h-6 hover:text-red-500 scale-105 anmiation'/>
              <TiEdit onClick={()=>{setOpenEdit(true)
                setEditAddressDetails(address)
              }}  className='w-6 h-6 hover:text-blue-600 scale-105 anmiation'/>
             </p>
            </div>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Country:</span> {address.country}

            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Address:</span> {address.adress_line}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Postal Code:</span> {address.pincode}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Mobile:</span> +880 {address.mobile}
            </p>
          </div>
        ))}
      </div>


      {addressList?.length === 0 && (
        <div className="text-center text-gray-500 text-sm mt-6">
          No address found.  
          <span
            onClick={() => setOpenAddress(true)}
            className="text-red-500 cursor-pointer ml-1 hover:underline"
          >
            Add one
          </span>
        </div>
      )}


      {openAddress && (
        <AddAddress close={()=>setOpenAddress(false)}/>
      )}
      {
        openEdit && (
          <EditAddres close={()=>setOpenEdit(false)}
          data={editAddressDetails}
          />
        )
      }
    </section>
  )
}
