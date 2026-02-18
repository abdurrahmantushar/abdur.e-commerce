import {Router} from 'express';
import { auth } from '../middleware/auth-middleware.js';
import { createProductController, deleteProductController, editProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductByCategoryAndSubCategorylist, getProductController, getSingleProductDetails, searchProduct } from '../controllers/productController.js';

export const productRouter= Router()

productRouter.post('/create',auth,createProductController)
productRouter.post('/get',getProductController)
productRouter.delete('/delete',deleteProductController)
productRouter.put('/update',editProductController)
productRouter.post('/get-product-by-category',getProductByCategory)
productRouter.post('/get-product-by-category-and-subCategory',getProductByCategoryAndSubCategory)
productRouter.post('/get-product-and-subCategory-by-category',getProductByCategoryAndSubCategorylist)
productRouter.post('/get-product-details',getSingleProductDetails)
productRouter.post('/search-products',searchProduct)