const cartService = requrie("../services/cart.service")

const findUserCart = async(req,res) =>{
    const user = req.user

    try {
        const cart = await cartService.findUserCart(user._id)
        return res.status(200).json({cart})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

const addItemToCart = async(req,res) =>{
    const user = req.user

    try {
        const cartItem = await cartService.addCartItem(user._id,req.body)
        return res.status(200).json({cartItem})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

module.exports = {findUserCart,addItemToCart}