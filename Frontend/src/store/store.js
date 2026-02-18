import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productReducer from "./productSlicce"
import cartReducer from './cartProdcutSlice'
import addressReducer from './addressSlice'
import orderReducer from './orderSlice'
export const store = configureStore({
    reducer:{
        user :userReducer,
        product : productReducer,
        cart : cartReducer,
        addresses : addressReducer,
        order : orderReducer
    },
})