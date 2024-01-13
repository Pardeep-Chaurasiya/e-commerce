const Category = require("../models/category.model")
const Product = require("../models/product.model")

const createProduct = async(reqData) =>{
    let topLevel = await Category.findOne({name:reqData.topLevelCategory})

    if(!topLevel){
        topLevel = new Category({
            name:reqData.topLevelCategory,
            level:1
        })
    }

    let secondLevel = await Category.findOne({
        name:reqData.secondLevelCategory,
        parentCategory:topLevel._id
    })

    if(!secondLevel){
        secondLevel = new Category({
            name:reqData.secondLevelCategory,
            parentCategory:topLevel._id,
            level:2
        })
    }

    let thirdLevel = await Category.findOne({
        name:reqData.thirdLevelCategory,
        parentCategory:secondLevel._id
    })

    if(!thirdLevel){
        thirdLevel = new Category({
            name:reqData.thirdLevelCategory,
            parentCategory:secondLevel._id,
            level:3
        })
    }

    const product = new Product({
        title:reqData.title,
        color:reqData.color,
        description:reqData.description,
        discountedPersent:reqData.discountedPersent,
        discountedPrice:reqData.discountedPrice,
        imageUrl:reqData.imageUrl,
        brand:reqData.brand,
        price:reqData.price,
        sizes:reqData.sizes,
        quantity:reqData.quantity,
        category:reqData.category,
    })  

    return await product.save()
}


const deletProduct = async(productId) =>{
    const product = await findProductById(productId)

    await Product.findByIdAndDelete(productId)
    return "Product deleted Successfully"
}

const updateProduct = async(productId,reqData) =>{
    return await Product.findByIdAndUpdate(productId,reqData)

}

const findProductById = async(id) =>{
    const product = await Product.findById(id).populate("category").exec()

    if(!product)
    throw new Error("Product not found :", id)

    return product
}

const getAllProducts = async(reqQuery) =>{
    let {category,color,sizes,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize} = reqQuery

    pageSize ||= 10

    let query = Product.find().populate("category")

    if(category){
        const existCategory = await Category.findOne({name:category})

        if(existCategory)
            query = query.where("category").equals(existCategory._id)
        else
            return {content:[],currentPage:1,totalPages:0}
    }

    if(color){
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()))

        const colorRegex = colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null

        query = query.where("color").regex(colorRegex)
    }

    if(sizes){
        const sizesSet = new Set(sizes)

        query.query.where("sizes.name").in([...sizesSet])
    }

    if(minPrice && maxPrice)
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice)

    if(minDiscount)
        query = query.where("discountedPersent").gt(minDiscount)

    if(stock)
        if(stock == "in_stock"){
            query = query.where("quantity").gt(0)
        }
        if(stock == "out_of_stock")
            query = query.where("quantity").gt(0)
        else if(stock == "out_of_stock")
            query = query.where("quantity").gt(1)

        if(sort){
            const sortDirection = sort === "price_high"?-1:1
            query=query.sort({discountedPrice:sortDirection})
        }

        const totalProducts = await Product.countDocuments(query)

        const skip = (pageNumber-1)*pageSize

        query = query.skip(skip).limit(pageSize)

        const products = await query.exec()

        const totalPages = Math.ceil(totalProducts/pageSize)

        return {content:products,currentPage:pageNumber,totalPages}

}

const createMultipleProduct = async(products) =>{
    for(let product of products){
        await createProduct(product)
    }
}

module.exports = {createProduct,deletProduct,updateProduct,findProductById,getAllProducts,createMultipleProduct}