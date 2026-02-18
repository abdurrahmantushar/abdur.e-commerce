import { ProductModel } from "../Models/Product-Model.js";
import { SubCategoryModel } from "../Models/subcategory-model.js";

export const createProductController = async (req,res)=>{
    try {
        const { name,image, category, subCategory, unit, stock, price, discount, description,more_details}= req.body
        if(!name && !image[0] && !category[0] && !subCategory[0]  && !price  && !description){
            return res.status(400).json({
                message : 'Complete All field info',
                error : true,
                success : false
            })
        }
            const Product = new ProductModel({
            name,image, category, subCategory, unit, stock, price, discount, description,more_details
            })
            const saveProduct = await Product.save()
            return res.json({
                message : 'Product Created SuccessFully',
                error : false,
                success : true
            })
    } catch (error) {
        return res.status(500).json({
            message : 'Server Error',
            error : true,
            success : false 
        })
    }
}
export const getProductController = async (req, res)=>{
    try {
        let { page , limit, search}= req.body
        if(!page){
            page = 1
        }
        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}
        const skip = (page -1) * limit
        const [data,totalCount]= await Promise.all([
            ProductModel.find(query).sort({createdAt: -1}).skip(skip).limit(limit).populate('category  subCategory'),
            ProductModel.countDocuments(query)
        ])

        return res.json({
            message : 'Product goted',
            error : false,
            success : true,
            totalCount :totalCount,
            totalPages : Math.ceil(totalCount/ limit),
            data : data
        })
        
        
    } catch (error) {
        return res.status(500).json({
            message : 'Server Error',
            error : true,
            success : false 
        })
    }
}
export const deleteProductController = async (req,res)=>{
    try {
        const {_id} = req.body

        const deleteProduct = await ProductModel.findByIdAndDelete(_id)
        return res.json({
            message : 'Product deleted SuccessFull',
            error : false,
            success : true ,
            data : deleteProduct
        })
    } catch (error) {
      
      return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    }) 
    }
}
export const editProductController = async(req,res)=>{
    try {
        
        const { _id,name,image, category, subCategory, unit, stock, price, discount, description,more_details}= req.body
        const checkProduct = await ProductModel.findById(_id)
        if(!checkProduct){
      return res.status(400).json({
        message : " check you details",
        error : true,
        success : false
      })            
        }
    if(!_id) {
      return res.status(400).json({
        message: "Product ID missing",
        error: true,
        success: false
      })
    }

        const updateProduct = await ProductModel.findByIdAndUpdate(_id,{
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        })
        return res.json({
            message : 'Upadte Successfull',
            data : updateProduct,
            error: false,
            success : true           
        })

    } catch (error) {  
      return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    }) 
    }
}
export const getProductByCategory = async(req,res) =>{
    try {
        const {id} = req.body
        if(!id){
            return res.json(400).json({
                message : 'Inavlid Category',
                error : true,
                success : false
            })}
        
        const product = await ProductModel.find({
            category : {$in : id}
        }).limit(20)

        return res.json({
            message : 'Category Product list here',
            error : false ,
            success : true,
            data : product
        })
       
    } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    }) 
    }
}
export const getProductByCategoryAndSubCategorylist = async(req,res) =>{
    try {
        const {id} = req.body
        if(!id){
            return res.json(400).json({
                message : 'Inavlid Category',
                error : true,
                success : false
            })}
        const subCategories = await SubCategoryModel.find({
            category : {$in : [id]}
        })

        const subCategoryIds = subCategories.map(subCat => subCat._id)

        const product = await ProductModel.find({
            category : {$in : [id]},
            subCategory : {$in : subCategoryIds},publish : true
        }).sort({createdAt : -1})
        
        return res.json({
            message : 'Category waise subCategory & Products',
            error : false ,
            success : true,
            data : {
                subCategories,product
            }
        })
       
    } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    }) 
    }
}
export const getProductByCategoryAndSubCategory = async (req, res) => {
  try {
    let { categoryId, subCategoryId, page = 1, limit = 10 } = req.body
    

    if (!categoryId || !subCategoryId) {
      return res.status(400).json({
        message: 'Provide valid info',
        error: true,
        success: false
      })
    }

    page = Number(page)
    limit = Number(limit)

    const query = {
      category: { $in: [categoryId] },
      subCategory: { $in: [subCategoryId] }
    }

    const skip = (page - 1) * limit

    const [data, dataCount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      ProductModel.countDocuments(query)
    ])

    console.log('FOUND PRODUCTS 👉', data.length)

    return res.json({
      message: 'Successful',
      error: false,
      success: true,
      totalCount: dataCount,
      limit,
      page,
      data
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
export const getSingleProductDetails = async (req,res)=>{
    try {
        
        const {productId} = req.body
        const product = await ProductModel.findOne({
            _id : productId
        })
        return res.json({
            message : 'Successfull',
            data : product,
            error : false,
            success : true
        })
    } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  
    }
}
export const searchProduct= async(req,res)=>{
    try {
        
        let {search , page ,limit} = req.body
        
        if(!page){
            page=1
        }
        if(!limit){
            limit-12
        }
        const query = search?{
            $text : {
                $search : search
            }
        } :{}

        const skip = (page -1) * limit
        const [data,dataCount]=await Promise.all([
            ProductModel.find(query).sort({createdAt : -1}).limit(limit).skip(skip).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return res.json({
            message :'SuccessFull',
            error : false ,
            success : true,
            data : data,
            totalCount : dataCount,
            totalPage: Math.ceil(dataCount/limit),
            page : page,
            limit : limit
        })
    } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    }) 
    }
}