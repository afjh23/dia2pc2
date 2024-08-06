import {login, verifyToken } from '../controllers/authController.js'
import { Router } from 'express'

const router = Router()

router.post('/login', login)
router.get('/verify', verifyToken)

export default router