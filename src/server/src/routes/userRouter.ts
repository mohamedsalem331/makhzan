import express from 'express'

const router = express.Router()

import { authUser, createUser, logoutUser } from '../controllers/userController'
import { verifyUserToken, verifyTokenStored } from '../middlewares/Auth'

// verifyUserToken, verifyTokenStored

router.route('/login').post(authUser)
router.route('/register').post(createUser)
router.route('/logout').post(logoutUser)

export default router
