import express from 'express'
import { user_routes } from '../constants/enums/routes'
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

router.route('/').get(verifyUserToken, verifyTokenStored, verifyAdmin, getAllUsers)
router.route(user_routes.LOGIN_USER).post(authUser)
router.route(user_routes.REGISTER_USER).post(createUser)
router.route(user_routes.LOGOUTUSER_USER).post(verifyUserToken, verifyTokenStored, logoutUser)
router
  .route(user_routes.DELETEUSER_USER)
  .delete(verifyUserToken, verifyTokenStored, verifyAdmin, deleteUser)

export default router
