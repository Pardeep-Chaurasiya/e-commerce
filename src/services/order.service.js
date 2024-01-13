const Address = require("../models/address.model")
const Order = require("../models/order.model")
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

const placeOrder = async(orderId) =>{
    const order = await findOrderById(orderId)

    order.orderStatus = "PLACED"
    order.paymentDetails.status = "COMPLETED"

    return await order.save()
}

const confirmedOrder = async(orderId) =>{
    const order = await findOrderById(orderId)

    order.orderStatus = "CONFIRMED"

    return await order.save()
}

const shipOrder = async(orderId) =>{
    const order = await findOrderById(orderId)

    order.orderStatus = "SHIPPED"

    return await order.save()
}

const deliverOrder = async(orderId) =>{
    const order = await findOrderById(orderId)

    order.orderStatus = "DELIVERED"

    return await order.save()
}

const cancleOrder = async(orderId) =>{
    const order = await findOrderById(orderId)

    order.orderStatus = "CANCELLED"

    return await order.save()
}

const findOrderById = async(orderId) =>{
    const order = await Order.findById(orderId).
    populate("user")
    .populate({path:"orderItems",populate:{path:"product"}})
    .populate("shippingAddress")

    return order
}

const usersOrderHistory = async(userId) =>{
    try {
        const orders = await Order.find({user:userId,orderStatus:"PLACED"})
    .populate({path:"orderItems",populate:{path:"product"}}).lean()
    return orders
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllOrders = async()=>{
    return await Order.find()
    .populate({path:"orderItems",populate:{path:"product"}}).lean()

}

const deleteOrder = async(orderId)=>{
    const order = await Order.findById(orderId)
    await Order.findByIdAndUpdate(order._id)
}


module.exports = {createOrder,placeOrder,confirmedOrder,shipOrder,deliverOrder,cancleOrder,findOrderById,usersOrderHistory,getAllOrders,deleteOrder}