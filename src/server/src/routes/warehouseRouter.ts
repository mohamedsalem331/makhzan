import express from 'express'

const router = express.Router()

import {
  getAllWarehouses,
  getWarehouse,
  createWarehouse,
  deleteWarehouse,
} from '../controllers/warehouseController'
import { verifyUserToken, verifyTokenStored, verifyAdmin } from '../middlewares/Auth'

// http://localhost:3000/warehouses/

router.route('/').get(getAllWarehouses)
router.route('/create').post(verifyUserToken, verifyTokenStored, createWarehouse)
router
  .route('/:id')
  .get(getWarehouse)
  .delete(verifyUserToken, verifyTokenStored, verifyAdmin, deleteWarehouse)

export default router
