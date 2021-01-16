import asyncHandler from 'express-async-handler'
import Products from '../models/productsModel.js'
import Product from '../models/productsModel.js'

//@desc .... Fetch All Products
//@route ... GET /api/products
//@access .. Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Products.countDocuments({ ...keyword })
    const products = await Products.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@desc .... Fetch Single Product
//@route ... GET /api/products/:id
//@access .. Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc .... Delete a product
//@route ... DELETE /api/products/:id
//@access .. Private/admin
const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc .... Create a product
//@route ... post /api/products/
//@access .. Private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Products({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


//@desc .... Update a product
//@route ... put /api/products/:id
//@access .. Private/admin
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Products.findById(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('product not found')
    }

    
})

//@desc .... Write a review
//@route ... post /api/products/:id/review
//@access .. Private
const reviewProduct = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Products.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed){
            res.status(404)
            throw new Error('product already reviewed by user')
        } else {
            const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating), 
            comment: comment
            }

            product.reviews.push(review)

            product.numReview = product.reviews.length

            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

            await product.save()
            res.status(201).json({ message: 'Review added'})
        }

        
    } else {
        res.status(404)
        throw new Error('product not found')
    }
    
    

    
    
})


//@desc .... Get top rated products
//@route ... post /api/products/top
//@access .. Public
const getTopProducts = asyncHandler(async (req, res) => {
     
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    
    res.json(products)
    
})



export {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProduct,
    reviewProduct,
    getTopProducts
}