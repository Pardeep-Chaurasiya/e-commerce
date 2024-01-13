const cartItemService = requrie("../services/cartItem.service")

const updateCartItem = async(req,res) =>{
    const user = req.user

    try {
        const updatedCartItem = await cartItemService.updateCartItem(user._id,req.params.id,req.body)
        return res.status(200).json({updatedCartItem})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}


const removeCartItem = async(req,res) =>{
    const user = req.user

    try {
        const updatedCartItem = await cartItemService.removeCartItem(user._id,req.params.id)
        return res.status(200).json({message:"cart item removed successfully"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}


module.exports = {updateCartItem,removeCartItem}