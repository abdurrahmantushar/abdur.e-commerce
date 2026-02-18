import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';

const VerifyOtp = () => {
  const navigate= useNavigate()
  const location = useLocation()
  const [formData, setFormData]=useState({
    otp: "",
    email : location?.state?.email || ""
  })
    //   useEffect(()=>{
    //     if(!(location?.state?.email)){
    //         navigate('/forgot-password')
    //     }
    // },[location])
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
                const res = await Axios({
                 ...SummaryApi.verify_forgot_otp,
                 data: formData
                })
                if(res.data.error){
                  toast.error(res.data.message)
                }
                if(res.data.success){
                  toast.success(res.data.message)
                  // const emailF=formData.email
                  setFormData({
                    email: "",
                    otp: "",
                    
                  })
                  navigate('/reset-password',{
                    state:{
                      email:formData.email
                    } 
                  })
                  setFormData({
                    email: "",
                    otp: "",
                  })
                }
            } catch (error) {
              AxiosToastError(error)
            }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter the OTP sent to your email
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg 
                         focus:outline-none focus:ring-2 
                         focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              OTP Code
            </label>
            <input
              type="text"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={handleChange}
              maxLength={6}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg 
                         tracking-widest text-center text-lg
                         focus:outline-none focus:ring-2 
                         focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg
                       hover:bg-red-700 transition font-semibold"
          >
            Verify OTP
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6 space-y-2">
          <p>
            Didn’t receive the code?{" "}
            <span className="text-red-600 hover:underline cursor-pointer">
              Resend OTP
            </span>
          </p>
          <p>
            Back to{" "}
            <Link to={'/login'} className="text-red-600 hover:underline cursor-pointer">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default VerifyOtp;
