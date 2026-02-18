import mongoose from "mongoose";

const orderSchema = new mongoose.Schema ({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    orderId : {
        type : String,
        required : [true, 'Provide orderId'],
        unique : true
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : 'product'
    },
    product_details: [
    {
        name: String,
        image: [String],
        quantity: Number,
        price: Number
    }
    ],
    paymentId : {
        type : String,
        default : ''
    },
    delivery_status: {
        type: String,
        enum: ["processing", "shipped", "delivered", "cancelled"],
        default: "processing"
    },
    payment_status : {
        type : String,
        default : ''
    },
    admin_note : {
        type : String,
        default : ''
    },
    delivery_adress : {
        type : mongoose.Schema.ObjectId,
        ref : 'address'
    },
    subTotalAmt : {
        type : Number,
        default : 0
    },
    totalAmt : {
        type : Number,
        default : 0
    },
    invoice_receipt : {
        type : String,
        default : ''
    },
    isSeen: {
  type: Boolean,
  default: false
}
},{
    timestamps : true
})

export const OrderModel = 
mongoose.model('order',orderSchema)