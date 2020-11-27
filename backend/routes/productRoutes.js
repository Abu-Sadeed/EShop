import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import asyncHandler from 'express-async-handler'
import Product from '../models/productsModel.js'

const router = express.Router()

//@desc .... Fetch All Products
//@route ... GET /api/products
//@access .. Public
router.route('/').get(asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
}))

//@desc .... Fetch Single Product
//@route ... GET /api/products/:id
//@access .. Public
router.route('/:id').get(asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    //res.json(product)
}))


export default router
