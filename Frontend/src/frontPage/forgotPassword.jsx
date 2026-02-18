import { useState } from "react";
import { toast } from "react-toastify";

import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

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
        ...SummaryApi.forgot_password,
        data: formData,
      });

      if (res.data.error) {
        toast.error(res.data.message);
        return;
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ email: "" });
        navigate("/verify-forgot-otp",{
          state:{
            email:formData.email        
          } 
        });
      }
      setFormData ({
        email : ''
      })
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your email to receive a reset code
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg
                       hover:bg-red-700 transition font-semibold"
          >
            Send Reset Code
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <Link to={'/login'} className="text-red-600 hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};;

export default ForgotPassword;
