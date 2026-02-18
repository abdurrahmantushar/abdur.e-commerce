import mongoose from "mongoose";
import { OrderModel } from "../Models/order-model.js";
import UserModel from "../Models/User-Model.js";
import { CardProductModel } from "../Models/cartProduct-Model.js";
import Stripe from "stripe";
import { ProductModel } from "../Models/Product-Model.js";



export const CashOnDeliveryOrderController =async(req,res)=>{
    try {
        let userId = req.userId
        const {list_item,totalAmt,adressId,subTotalAmt} = req.body
        const payload = list_item.map(el=>{
            return ({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                porductId : el.productId._id,
                product_details : {
                 name : el.productId.name,
                 image : el.productId.image
                },
                paymentId :'',
                payment_status : 'Cash On Delivery',
                delivery_adress : adressId,
                subTotalAmt : subTotalAmt,
                totalAmt : totalAmt,
                delivery_status: "processing",
                admin_note: "" 
            })
        })
        const generateOrder = await OrderModel.insertMany(payload)

        const removeCartITem = await CardProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId },{
            shopping_cart : []
        })
        return res.json({
            message : 'Order Place Successfull',
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

export const priceWithDiscount = (price, dis = 0) => {
  const originalPrice = Number(price) || 0
  const discount = Number(dis) || 0

  const discountAmount = Math.floor(
    (originalPrice * discount) / 100
  )

  return originalPrice - discountAmount
}

export const paymentController = async (req, res) => {
  try {
    const userId = req.userId;
    const { list_item, totalAmt, adressId, subTotalAmt } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false });


    const productDetails = list_item.map(item => ({
      id: item.productId._id,
      name: item.productId.name,
      image: Array.isArray(item.productId.image) ? item.productId.image.map(img => img.replace("http://", "https://"))
        : [],
      quantity: item.quentity,
      price: item.productId.price
    }));
    const order = await OrderModel.create({
      userId,
      orderId: `ORD-${new mongoose.Types.ObjectId()}`,
      payment_status: "pending",
      product_details: productDetails,               
      delivery_adress: adressId,
      subTotalAmt,
      totalAmt,
      isSeen : false
    });
    const line_items = list_item.map(item => (
      {
      
      price_data: {
        currency: "bdt",
        unit_amount: item.productId.price * 100,
        product_data: {
          name: item.productId.name,
          images: item.productId.image?.length
            ? item.productId.image.map(img => img.replace("http://", "https://"))
            : [],
          metadata: {
            productId: item.productId._id.toString()
          }
        },
      },
      adjustable_quantity: { enabled: true, minimum: 1 },
      quantity: item.quentity
      
    }));

    
    const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items,
      success_url: `${process.env.FRONTEND_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/order-cancel`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString()
      }
    });

    return res.status(200).json({
      url: session.url,
      orderId: order._id
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true
    });
  }
};

export const webHookStripe = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);
  const sig = req.headers["stripe-signature"];


  let event;

  try {

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_SECRETE_API_KEY
    );

  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const orderId = session.metadata.orderId; 
      const paymentId = session.payment_intent;
      const userId = session.metadata.userId;
      await OrderModel.findByIdAndUpdate(orderId, {
        payment_status: "Paid",
        paymentId: paymentId,
        paid: true, 
      });
        const removeCartITem = await CardProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId },{
            shopping_cart : []
        })
    } catch (dbErr) {
      console.log("❌ Error updating order in DB:", dbErr.message);
    }
  }
  res.json({ received: true });
};

export const getOrderDetails = async (req,res) => {
  try {
    const userId = req.userId
    const orderList = await OrderModel.find({ userId: userId }).sort({ createdAt: -1 }).populate("delivery_adress");

    return res.json({
      message: 'Order list',
      data: orderList,
      error: false,
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const markOrderAsSeenController = async (req,res) => {
  try {
     
    const {orderId} = req.params;

    const updateOrder = await OrderModel.findByIdAndUpdate(orderId,
      {isSeen : true},
      {new : true}
    )
     if (!updateOrder) {
      return res.json({
        message : 'Order not found',
        success : false
      });
     }
     return res.status(200).json({
      message : 'order marked as seen',
      success : true
     })
  } catch (error) {
      return res.status(500).json({
      message: error.message,
      success: false
    });
  }
}

export const orderUpdateController = async (req,res) =>{
  try {
    
    const {orderId} = req.params
    const {delivery_status,admin_note} = req.body


    const updateOrder = await OrderModel.findByIdAndUpdate( orderId,
      {$set:{delivery_status,
    admin_note}},
      {new : true}
     )

     if (!updateOrder){
      return  res.json({
        message : 'Order not found',
        success : false
      })
     }
     return res.status(200).json({
      message : 'Order updated successfully',
      success : true,
      data : updateOrder
     })
  } catch (error) {
      return res.status(500).json({
      message: error.message,
      success: false
    });
  }
}