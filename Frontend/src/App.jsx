import { Outlet } from "react-router-dom"
import { Footer} from "./components/footer"
import { HeaderBox } from "./components/header"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import { useDispatch} from "react-redux"

import { GetUserDetails } from "./common config/getUserDetails";
import { setUserDetails } from "./store/userSlice";
import { Axios } from "./common config/axiox";
import { SummaryApi } from "./common config/summayApi";
import { setAllCategory,setAllSubCategory,setLoadingState } from "./store/productSlicce";
import { AxiosToastError } from "./common config/axiosToastEross";
import GlobalProvider from "./provider";
import CartMobileVerson from "./components/cartMobileVerson";


export const App=()=> {

  const dispatch = useDispatch();
    const getCategory = async ()=>{
    try {
      dispatch(setLoadingState(true))
      const res = await Axios({
        ...SummaryApi.getCategory,

      })
      
      const {data:resData }=res;
      if(resData.success){
      dispatch (setAllCategory(resData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
     dispatch(setLoadingState(false))
    }
  }
    const getSubCategory = async ()=>{
    try {
      
      const res = await Axios({
        ...SummaryApi.getSubCategory,

      })
      
      const {data:resData }=res;
      if(resData.success){
      dispatch (setAllSubCategory(resData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
     
    }
  }

    useEffect(() => {
    getCategory()
    getSubCategory()
    
      
  }, [])
  useEffect(()=>{
    const token = localStorage.getItem("accessToken");
    if(!token) return;
    const restoreUser=async ()=>{
    const user = await GetUserDetails()
    if(user?._id){
      dispatch(setUserDetails(user))
    }
  }
 restoreUser()
  },[])
    return (
      <GlobalProvider>
        <HeaderBox/>
        <main className=" min-h-[85.6vh] bg-[#FFFDF5]">
        <Outlet/>
        </main>
        <Footer/>
        <ToastContainer/>
        {
          location.pathname !== '/check-Out' && (

            <CartMobileVerson/>
          )
        }
      </GlobalProvider>
    )
}



