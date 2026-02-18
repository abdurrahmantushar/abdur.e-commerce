import { CategoryModel } from "../Models/category-model.js";
import { ProductModel } from "../Models/Product-Model.js";
import { SubCategoryModel } from "../Models/subcategory-model.js";

export const AddCategoryControllerr =async (req,res)=>{

    try {
        const {name,image}=req.body
        if(!name || !image){
            return res.status(400).json({
                message: 'Enter required fields',
                error:true,
                success:false
            })
        } 
        const addCategory = new CategoryModel({
            name,
            image
        })
        const saveCategory = await addCategory.save()

        if(!saveCategory){
            return res.status(500).json({
                message : 'Not created',
                error : true,
                success:false
            })
        }
        return res.json({
            message:'SuccessFully added',
            error : false,
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message|| error,
            error : true,
            success:false
        })
    }
}
export const getCategoryController = async (req,res)=>{
    try {
      
        const data = await CategoryModel.find()
        return res.json({
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const updateCategoryController = async (req,res)=>{
    try {
        const { _id,name,image }= req.body
        const update = await CategoryModel.updateOne({
            _id : _id
        },{
            name,
            image
        })
        return res.json({
            message : 'Update Done',
            error : false,
            success : true,
            data : update
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body

    const checkSubCategory = await SubCategoryModel.countDocuments({
      category: { $in: [_id] }
    })

    const checkProduct = await ProductModel.countDocuments({
      category: { $in: [_id] }
    })

    if (checkProduct > 0 || checkSubCategory > 0) {
      return res.status(400).json({
        message: "Category is already used so can't delete",
        error: true,
        success: false
      })
    }

    const result = await CategoryModel.deleteOne({ _id })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Category not found",
        error: true,
        success: false
      })
    }

    return res.json({
      message: "Delete Successful",
      error: false,
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false
    })
  }
}
