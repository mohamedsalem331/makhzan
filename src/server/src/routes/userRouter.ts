import express from 'express'

const router = express.Router()

import { authUser, fdsfds } from '../controllers/userController'

router.post('/login', authUser).get('./login', fdsfds)

export default router
