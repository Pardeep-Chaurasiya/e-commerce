const  Rating = require("../models/rating.model")
const productService = require("../services/product.service")

const createRating = async(req,user)=>{
    const product = await productService.findProductById(reqData.productId)

    const rating =  new Rating({
        user:user._id,
        product:product._id,
        rating:req.rating,
        createdAt:new Date()
    })

    return await rating.save() 
}

const getProductRatings =async(productId)=>{

    return await Rating.find({product:productId})
}

module.exports = {createRating,getProductRatings}