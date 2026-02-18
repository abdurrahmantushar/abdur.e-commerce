import mongoose from "mongoose"; 

const bannerSchema = new mongoose.Schema({
    desktopImage: { type: String },
    mobileImage: { type: String }
})

export const BannerModel = mongoose.model('banner', bannerSchema)
