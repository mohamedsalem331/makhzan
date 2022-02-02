import express from 'express'

const router = express.Router()

import {
  authUser,
  createUser,
  logoutUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController'
import { verifyUserToken, verifyTokenStored, verifyAdmin } from '../middlewares/Auth'

//http:localhost:3000/users/

router.route('/').get(getAllUsers)
router.route('/login').post(authUser)
router.route('/register').post(createUser)
router.route('/logout').post(verifyUserToken, verifyTokenStored, logoutUser)
router.route('/delete/:id').delete(verifyUserToken, verifyTokenStored, verifyAdmin, deleteUser)

export default router
