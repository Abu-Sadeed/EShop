import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getProducts, getProductById, deleteProductById, createProduct, updateProduct, reviewProduct, getTopProducts } from '../controllers/productControllers.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router.get('/top', getTopProducts)

router.route('/:id').get(getProductById).delete(protect, admin, deleteProductById).put(protect, admin, updateProduct)

router.route('/:id/review').post(protect, reviewProduct)

export default router
