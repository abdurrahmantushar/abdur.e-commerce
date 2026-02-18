import { SubCategoryModel } from "../Models/subcategory-model.js";

export const AddSubCategoryController = async (req,res)=>{
    try {
        const {name , image, category} = req.body
        if(!name && ! image && ! category[0]){
            return res.status(400).json({
                message : 'Provide all valid info',
                error : true,
                success : false
            })
        }

        const payload = {
            name,
            image,
            category
        }
        const createSubCategory = new SubCategoryModel(payload)
        const save = await createSubCategory.save()

        return res.json({
            message : " Created successfull",
            error : false,
            success : true,
            data:save
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const getSubCategoryController = async (req, res) => {
  try {
    const data = await SubCategoryModel
      .find()
      .sort({ createdAt: -1 })   // ✅ sort
      .populate('category')      // ✅ populate

    return res.json({
      data,
      error: false,
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}
export const editSubCategoryController = async (req,res)=>{
  try {

    const {_id , name , image, category} = req.body
    const checkSub = await SubCategoryModel.findById(_id)

    if (!checkSub){
      return res.status(400).json({
        message : " check you Id",
        error : true,
        success : false
      })
    }
    const updateSub = await SubCategoryModel.findByIdAndUpdate(_id,{
      name,
      image,
      category
    })
    return res.json({
      message : 'Upadte Successfull',
      data : updateSub,
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
export const deleteSubCategoryController = async (req,res)=>{
  try {
      const {_id} = req.body

      const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)
      return res.json({
        message : 'Delete Successcfully',
        data : deleteSub,
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
