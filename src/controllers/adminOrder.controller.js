const orderService = require("../services/order.service")

const getAllOrders = async(req,res) =>{
    try {
        const orders = await orderService.getAllOrders()
        return res.status(200).json({orders})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

const confirmOrders = async(req,res) =>{
    try {
        const orderId = req.params.orderId
        const orders = await orderService.confirmedOrder(orderId)
        return res.status(200).json({orders})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

const shipOrders = async(req,res) =>{
    try {
        const orderId = req.params.orderId
        const orders = await orderService.shipOrder(orderId)
        return res.status(200).json({orders})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

const deliverOrders = async(req,res) =>{
    try {
        const orderId = req.params.orderId
        const orders = await orderService.deliverOrder(orderId)
        return res.status(200).json({orders})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

const cancelledOrders = async(req,res) =>{
    try {
        const orderId = req.params.orderId
        const orders = await orderService.cancleOrder(orderId)
        return res.status(200).json({orders})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

const deleteOrders = async(req,res) =>{
    try {
        const orderId = req.params.orderId
        const orders = await orderService.deleteOrder(orderId)
        return res.status(200).json({orders})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}


module.exports = {deleteOrders,cancelledOrders,deliverOrders,shipOrders,confirmOrders,getAllOrders}