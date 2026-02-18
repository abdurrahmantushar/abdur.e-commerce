import React from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'

import { Axios } from "../common config/axiox";
import { SummaryApi } from "../common config/summayApi";
import { AxiosToastError } from "../common config/axiosToastEross";
import { useGlobalContext } from "../provider";

const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();
  const { getAddress} = useGlobalContext()

  const onSubmit = async (data) => {

    reset();

    try {
      const res = await Axios({
        ...SummaryApi.createAddress,
        data : {
            adress_line :data.address_line,
            city : data.city,
            state: data.state,
            country: data.country,
            mobile : data.mobile,
            pincode :data.pincode,
        }
      })
      const {data : resData} = res
      if(resData.success){
        toast.success(resData.message)
        if(close){
          close()
          reset()
          getAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-16">
      <div className="bg-white w-full max-w-lg rounded-lg p-5 shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Add Address</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 grid gap-3"
        >
          <input
            type="text"
            placeholder="Address Line"
            className="border p-2 rounded bg-blue-50"
            {...register("address_line", { required: true })}
          />

          <input
            type="text"
            placeholder="City"
            className="border p-2 rounded bg-blue-50"
            {...register("city", { required: true })}
          />

          <input
            type="text"
            placeholder="State"
            className="border p-2 rounded bg-blue-50"
            {...register("state")}
          />

          <input
            type="number"
            placeholder="Pincode"
            className="border p-2 rounded bg-blue-50"
            {...register("pincode", { required: true })}
          />

          <input
            type="text"
            placeholder="Country"
            className="border p-2 rounded bg-blue-50"
            {...register("country", { required: true })}
          />

          <input
            type="number"
            placeholder="Mobile Number"
            className="border p-2 rounded bg-blue-50"
            {...register("mobile", { required: true })}
          />

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Save Address
            </button>

            <button
              type="button"
              onClick={close}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
