const ratingService = require("../services/rating.service")

const createRating = async(req,res) =>{
    const user= req.user
    try {
        const rating = await ratingService.createRating(req.body,user)
        return res.status(201).json({rating})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

const getAllRatings = async(req,res) =>{
    const productId = req.params.id;
    try {
        const ratings = await ratingService.getAllRatings(productId)
        return res.status(200).json({ratings})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

module.exports = {createRating,getAllRatings}