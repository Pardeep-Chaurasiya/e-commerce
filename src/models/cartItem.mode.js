const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema(
    {
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"products",
            required:true
        },
        cart:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"cart",
            required:true
        }],
        size:{
            type:Number,
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        },
        price:{
            type:Number,
            required:true,
        },
        discountedPrice:{
            type:Number,
            required:true,
            default:0
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true
        },
        
    }
)


const CartItem = mongoose.model("cartItems",cartItemSchema)

module.exports = CartItem