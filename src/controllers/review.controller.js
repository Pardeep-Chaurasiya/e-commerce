const reviewService = require("../services/review.service")

const createReview = async(req,res) =>{
    const user= req.user
    try {
        const review = await reviewService.createReview(req.body,user)
        return res.status(201).json({review})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

const getAllReview = async(req,res) =>{
    const productId = req.params.id;
    try {
        const reviews = await reviewService.getAllReview(productId)
        return res.status(200).json({reviews})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

module.exports = {createReview,getAllReview}