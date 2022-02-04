import express from 'express'
import { warehouse_routes } from '../constants/enums/routes'
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
router
  .route(warehouse_routes.CREATE_WAREHOUSE)
  .post(verifyUserToken, verifyTokenStored, createWarehouse)
router
  .route(warehouse_routes.FETCH_DELETE_WAREHOUSE)
  .get(getWarehouse)
  .delete(verifyUserToken, verifyTokenStored, deleteWarehouse)

export default router
