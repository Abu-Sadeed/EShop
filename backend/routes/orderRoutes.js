import express from 'express'
import { addOrderItems, getOrderbyId, updateOrderTOPaid, getMyOrders, getOrders, updateOrderTODelivered } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderbyId)
router.route('/:id/pay').put(protect, updateOrderTOPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderTODelivered)



export default router
