const Cart = require("../models/cart.model")
const CartItem = require("../models/cartItem.mode")

const createCart = async(user) =>{
    try {
        const cart = new Cart({user})
        const createdCart = await cart.save()
        return createdCart
    } catch (error) {
        throw new Error(error.message)
    }
}


const findUserCart = async(userId) =>{
    try {
        const cart = await Cart.findOne({user:userId})

        const cartItems = await CartItem.find({cart:cart._id}).populate("product")

        cart.cartItems = cartItems

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0

        for(let cartItem of cart.cartItems){
            totalPrice+=cartItem.price;
            totalDiscountedPrice+=cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice
        cart.totalItem = totalItem
        cart.totalPrice = totalPrice

        return cart
    } catch (error) {
        throw new Error(error.message)
        
    }
}

module.exports = {createCart,findUserCart}