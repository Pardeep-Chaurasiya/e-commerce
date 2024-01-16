const productService = require("../services/product.service")

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body)
        return res.status(201).json({ product })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.deleteProduct(productId)
        return res.status(200).json({ createdOrder })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.updateProduct(productId, req.body)
        return res.status(200).json({ product })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const findProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.findProductById(productId)
        return res.status(200).json({ product })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const product = await productService.getAllProducts(req.query)
        return res.status(200).json({ product })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createMultipleProduct = async (req, res) => {
    try {
        const product = await productService.createMultipleProduct(req.body)
        return res.status(200).json({ message: "Product careated successfully" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { createMultipleProduct, getAllProducts, findProductById, updateProduct, deleteProduct, createProduct }