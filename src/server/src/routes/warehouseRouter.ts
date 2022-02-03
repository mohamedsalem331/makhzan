import express from 'express'

const router = express.Router()

import {
  getAllWarehouses,
  getWarehouse,
  createWarehouse,
  deleteWarehouse,
  filterAllWarehouses,
} from '../controllers/warehouseController'
import { verifyUserToken, verifyTokenStored } from '../middlewares/Auth'

// http://localhost:3000/warehouses/

router.route('/').get(getAllWarehouses).post(filterAllWarehouses)
router.route('/create').post(verifyUserToken, verifyTokenStored, createWarehouse)
router.route('/:id').get(getWarehouse).delete(verifyUserToken, verifyTokenStored, deleteWarehouse)

export default router
