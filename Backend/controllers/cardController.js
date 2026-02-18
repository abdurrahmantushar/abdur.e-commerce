import { CardProductModel } from "../Models/cartProduct-Model.js";
import UserModel from '../Models/User-Model.js'

export const addTocutItemController = async (req,res) =>{
    try {
         
        const userId = req.userId
        const { productId } = req.body

        if(!productId){
            return res.status(402).json({
                message : 'invalid',
                error : true,
                success : false
            })
        }
        const chekExistItems = await CardProductModel.findOne({
            userId : userId,
            productId : productId
        })

        if(chekExistItems){
            return res.status(400).json({
                message : 'Iteam already Included',
                error : true,
                success : false
            })
        }
        const cartItem = new CardProductModel({
            quentity : 1,
            userId : userId,
            productId :productId
        })
        const save = await cartItem.save()

         const updateCartUser = await UserModel.updateOne({
            _id :userId,
         },{
            $push :{shopping_cart : productId}
         })

         return res.json({
            message : 'Successfull',
            data : save,
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
export const getCartDetailsConroller = async (req,res)=>{
    try {
        const userId = req.userId

        const cartDetails = await CardProductModel.find({ 
            userId : userId
        }).populate('productId')
        return res.json({
            data : cartDetails,
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
export const upgradCartItemsController = async(req,res)=>{
    try {
        const userId = req.userId
        const {_id,qty} = req.body

        if(!_id || !qty){
            return res.status(400).json({
                message : 'Invalid Id and quantity'
            })
        }

        const updateCart= await CardProductModel.updateOne({
            _id : _id,
            userId : userId

        },{
            quentity : qty
        })
        return res.json({
            message : 'Updated Cart',
            error : false,
            success : true,
            data : updateCart
        })
    } catch (error) {
            return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const deleteCartItemController = async (req,res)=>{
    try {
        const userId = req.userId
        const {_id } = req.body


        if(!_id){
            return res.status(400).json({
                message : 'Provide valid info',
                error : true,
                success : false
            })
        }

        const deleteCart = await CardProductModel.deleteOne({_id : _id,userId : userId})
        return res.json({
            message : 'Item Removed',
            error : false,
            success : true,
            data : deleteCart
        })
    } catch (error) {
            return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })  
    }
}