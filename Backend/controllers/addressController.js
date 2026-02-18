import { AdressModel } from "../Models/Address-Model.js";
import UserModel from "../Models/User-Model.js";

export const addressController=async(req,res)=>{
    try {
        const userId = req.userId
        const {adress_line,city,state,pincode,country,mobile} = req.body
        const createAddress= new AdressModel({
            adress_line,
            city,
            state,
            country,
            mobile,
            pincode,
            userId
        })
        const saveAddress= await createAddress.save()
        const addUserAdressId = await UserModel.findByIdAndUpdate(userId,{
            $push:{
                address_details : saveAddress._id
            }
        })
        return res.json({
            message : 'Address created successfully',
            error : false,
            success : true,
            data : saveAddress
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message||error,
            error : true,
            success : false
        })
    }
}
export const getAddressController = async (req,res)=>{
    try {
         let userId = req.userId
        const data = await AdressModel.find({ userId : userId }).sort({createdAt: -1})

        return res.json({
            message : 'List of address',
            error : false,
            success : true,
            data : data
        })
    } catch (error) {
            return res.status(500).json({
            message : error.message||error,
            error : true,
            success : false
        })
    }
}
export const updateAddressController = async (req,res)=>{
    try {
        let userId = req.userId
        const {_id,adress_line,city,state,pincode,country,mobile} = req.body
        console.log('userid and id ',_id,userId)
        const updateAddress = await AdressModel.updateOne({ _id : _id , userId : userId },{
            adress_line,
            city,
            state,
            country,
            mobile,
            pincode
        } )
        return res.json({
            message : 'Address Updted',
            error : false,
            success : true,
            data : updateAddress
        })
    } catch (error) {
            return res.status(500).json({
            message : error.message||error,
            error : true,
            success : false
        })        
    }
}
export const deleteAddressController = async (req,res) =>{
    try {
        let userId = req.userId

        const {_id} = req.body

        const disableAddress = await AdressModel.updateOne({_id : _id,userId},{
            status : false
        })
        return res.json({
            message : 'Address Removed',
            error : false,
            success : true,
            data:disableAddress
        })
    } catch (error) {
            return res.status(500).json({
            message : error.message||error,
            error : true,
            success : false
        })          
    }
}