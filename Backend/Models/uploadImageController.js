import { uploadImageCloud } from "../Cloudenary/image-cloud.js"
import { BannerModel } from "../Models/banner-model.js"


export const uploadImageController =async (req,res)=>{
    try {
        const file = req.file
        const uploadImage = await uploadImageCloud(file)
        return res.json({
            message: 'Upload done',
            success : true,
            data:uploadImage
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}
export const uploadBannerController = async (req,res)=>{
    try {

        const image = req.file
        if (!image) {
            return res.json({
                success : false,
                message : 'No Image Uploaded'
            })
        }
        const upload = await uploadImageCloud(image)
        console.log("Cloud URL:", upload.url)
        const banner = await BannerModel.findOneAndUpdate({},
            {image : upload.url},
            {new : true ,upsert: true }
        )
        console.log("Saved Banner:", banner)
        return res.json({
            message : 'Banner Uploaded',
            success : true,
            data : banner
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
export const getBannerController = async (req, res) => {
  try {
    const banner = await BannerModel.findOne()

    return res.json({
      success: true,
      data: banner
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
