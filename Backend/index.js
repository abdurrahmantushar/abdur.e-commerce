import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from 'dotenv'
dotenv.config()

import { ConnectDB } from "./config/connect-mongodb.js";
import { userRoute } from "./routes/user-routes.js";
import categoryRouter from "./routes/category-routes.js";
import uploadRouter from "./routes/uploadController.js";
import subCategoryRouter from "./routes/subCategory-routes.js";
import { productRouter } from "./routes/product-Routes.js";
import cartRouter from "./routes/cart-routes.js";
import addressRouter from "./routes/address-routes.js";
import orderRouter from "./routes/order-routes.js";
import { webHookStripe } from "./controllers/orderController.js";


const app= express()
app.use(cors({
    credentials : true,
    origin: process.env.FRONTEND_URL
}))

app.post(
  "/api/order/webhook",
  express.raw({ type: "application/json" }),
  webHookStripe
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet({
    crossOriginResourcePolicy: false
}))
const PORT = process.env.PORT || 4500;
app.get("/",(req,res)=>{
    res.json({
        message : 'server is running'
    })
})

app.use('/api/user',userRoute)
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadRouter)
app.use('/api/sub-category',subCategoryRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)
ConnectDB()

app.listen(PORT,()=>{
    console.log('server is running', PORT)
})
