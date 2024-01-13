const orderService = requrie("../services/order.service")

const createOrder = async(req,res) =>{
    const user = req.user

    try {
        const createdOrder = await orderService.createOrder(user,req.body)
        return res.status(201).json({createdOrder})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

const findOrderById = async(req,res) =>{
    const user = req.user

    try {
        const createdOrder = await orderService.findOrderById(req.params.id)
        return res.status(200).json({createdOrder})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

const orderHistory = async(req,res) =>{
    const user = req.user

    try {
        const createdOrder = await orderService.usersOrderHistory(user._id)
        return res.status(200).json({createdOrder})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

module.exports = {createOrder,findOrderById,orderHistory}