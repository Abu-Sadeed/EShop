import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getProducts, getProductById, deleteProductById, createProduct, updateProduct } from '../controllers/productControllers.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.route('/:id').get(getProductById).delete(protect, admin, deleteProductById).put(protect, admin, updateProduct)


export default router
