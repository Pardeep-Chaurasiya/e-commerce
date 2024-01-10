const Address = require("../models/address.model")
const cartService = require("./cart.service")

const createOrder = async(user,shipAddress) =>{
    let address;

    if(shipAddress._id){
        const existAddress = await Address.findById(shipAddress._id)
        address =existAddress
    }else{
        address = new Address(shipAddress)
        address.user = user
        await address.save()

        user.addresses.push(address)
        await user.save()
    }

    const cart = await cartService.findUserCart(user._id)
    const orderItems = []

    for (const item of cart.cartItems){
        const orderItem = new orderItems({
            price:item.price,
            product:item.product,
            quantity:item.quantity,
            size:item.size,
            userId:item.userId,
            discountedPrice:item.discountedPrice,
        })

        const createOrderItem = await orderItem.save()
        orderItems.push(createOrderItem)
    }

    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice:cart.totalItem,
        totalDiscountedPrice:cart.totalDiscountedPrice,
        discounte:item.discounte,
        totalItem:item.totalItem,
        shipAddress:address
    })

    const savedOrder = await createOrder.save()

    return savedOrder
}

module.exports = {createOrder}