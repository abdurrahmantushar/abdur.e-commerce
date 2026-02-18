import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";

import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { AxiosToastError } from '../common config/axiosToastEross';
import { useLocation, useNavigate } from "react-router-dom";

export const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [formData, setFormData] = useState({
        email: location.state?.email ||"",
        newPassword: "",
        confirmPassword: "",
    });
    const validValue= Object.values(formData).every(el =>el)

    useEffect(()=>{
        if(!(location?.state?.email)){
            navigate('/')
        }
    },[])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New Password & Confirm Password not matching");
            return;
        }
        try {
            const res = await Axios({
                ...SummaryApi.reset_password,
                data: formData
            })
            if (res.data.error) {
                toast.error(res.data.message)

            }
            if (res.data.success) {
                toast.success(res.data.message)
                setFormData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })


                navigate('/login')
            }
        } catch (error) {
            AxiosToastError(error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Reset <span className="text-red-500">Password</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            required
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-gray-600 mb-1">New Password</label>
                                    <div className=' flex'>
                                      <input
                                        type={showPassword ? 'text' : "password"}
                                        name="newPassword"
                                        placeholder="Create a password"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        required
                                      />
                                    <div
                                     onClick={()=>setShowPassword(prev => !prev)}
                                     className=' cursor-pointer mt-3 pl-1'>
                                      {
                                        showPassword ? (
                                          <FiEye />
                                        ) : (
                        
                                          <FiEyeOff />
                                        )
                                      }
                                    </div>
                                    </div>
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">Confirm Password</label>
                                     <div className=' flex'>
                                       <input
                                         type={showConfirmPassword ? 'text' : "password"}
                                         name="confirmPassword"
                                         placeholder="Create a password"
                                         value={formData.confirmPassword}
                                         onChange={handleChange}
                                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                         required
                                       />
                                     <div
                                      onClick={()=>setShowConfirmPassword(prev => !prev)}
                                      className=' cursor-pointer mt-3 pl-1'>
                                       {
                                         showConfirmPassword ? (
                                           <FiEye />
                                         ) : (
                         
                                           <FiEyeOff />
                                         )
                                       }
                                     </div>
                                     </div>   
                    </div>

                    <button
                        disabled={!validValue}
                        type="submit"
                        className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition mt-4"
                    >
                        Reset Password
                    </button>
                </form>

                {/* Back to login */}
                <p className="text-center text-gray-600 mt-6">
                    Remember your password?{" "}
                    <a href="/login" className="text-red-500 font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};
