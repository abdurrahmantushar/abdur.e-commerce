import { createBrowserRouter } from "react-router-dom";

import { App } from '../App'
import { HomePage } from "../frontPage/homePage";
import SearchPage from "../frontPage/SearchPage";
import { Login } from "../frontPage/loging";
import { RegisterPage } from "../frontPage/registerUser";
import ForgotPassword from "../frontPage/forgotPassword";
import VerifyOtp from "../frontPage/verifyOtp";
import { ResetPassword } from "../frontPage/resetPassword";
import UserMenuMobile from "../frontPage/userMenuMobile";
import Dashboard from "../layouts/dashboard";
import UserProfile from "../userInfo/UserProfile";
import { MyAdress } from "../userInfo/adress";
import { MyOrder } from "../userInfo/orders";
import { Category } from "../userInfo/category";
import { SubCategory } from "../userInfo/subCategory";
import { UploadProducts } from "../userInfo/uploadProducts";
import { AdminProductPage } from "../userInfo/productPage";
import UploadCategory from "../userInfo/uploadCategory";
import UserProduct from "../components/product";
import ProductListPage from "../components/productListPage";
import SingleProductshowPage from "../components/singleProductshowPage";
import CartShowMobile from "../components/cartShowMobile";
import CheckOutPage from "../components/checkOutPage";
import OrderSuccess from "../components/OrderSuccess";
import AdminOrderPage from "../userInfo/adminOrderPage";
import PrivateRoute from "./privateRoutes";
;


export const router = createBrowserRouter([
    {
        
        path:'/',
        element : <App/>,
        children:[
            {
                path:'',
                element: <HomePage/>
            },
            {
                path:'search',
                element:<SearchPage/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<RegisterPage/>
            },
            {
                path:'forgot-password',
                element:<ForgotPassword/>
            },
            {
                path:'verify-forgot-otp',
                element : <VerifyOtp/>
            },
            {
                path: 'reset-password',
                element : <ResetPassword/>

            },
            {
                path:'user-m',
                element: <UserMenuMobile/>
            },
            {
                path:'dashboard',
                element:(
                    <PrivateRoute>
                    <Dashboard/>
                    </PrivateRoute>  ),
                children:[
                    {
                        path:'my-profile',
                        element:<UserProfile/>
                    },
                    {
                        path:'my-orders',
                        element:<MyOrder/>
                    },
                    {
                        path:'my-address',
                        element:<MyAdress/>
                    },
                    {
                        path:'category',
                        element: <Category/>
                    },
                    {
                        path:'sub-category',
                        element:<SubCategory/>
                    },
                    {
                        path:'products',
                        element:<AdminProductPage/>
                    },
                    {
                        path:'upload-products',
                        element:<UploadProducts/>
                    },
                    {
                        path:'upload-category',
                        element:<UploadCategory/>
                    },
                    {
                        path:'product',
                        element :<UserProduct/>
                    },
                    {
                        path : 'user-order',
                        element : <AdminOrderPage/>
                    }
                ]
            },            
            {
                path : 'product/:productSlug',
                element : <SingleProductshowPage/>
            },
            {
                path : ':categorySlug/product/:productSlug',
                element : <SingleProductshowPage/>

            },
            
                    {
                        path : ':category',
                        element : <ProductListPage/>
                    },
                    {
                        path : 'cart',
                        element: (
                            <PrivateRoute>
                        <CartShowMobile/>
                         </PrivateRoute>       )
                    },
                    {
                        path : 'check-Out',
                        element : (
                            <PrivateRoute>
                                <CheckOutPage/>
                            </PrivateRoute>)
                    },
                    {
                        path : '/order-success',
                        element : <OrderSuccess/>
                    }
        ]
    }
])
