import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getAllUser, deleteUser, getUser, updateUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getAllUser)

router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUser).put(protect, admin, updateUser)

export default router