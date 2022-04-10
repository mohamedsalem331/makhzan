"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../constants/enums/routes");
const router = express_1.default.Router();
const warehouseController_1 = require("../controllers/warehouseController");
const Auth_1 = require("../middlewares/Auth");
// http://localhost:3000/warehouses/
router.route('/').get(warehouseController_1.getAllWarehouses).post(warehouseController_1.filterAllWarehouses);
router
    .route(routes_1.warehouse_routes.CREATE_WAREHOUSE)
    .post(Auth_1.verifyUserToken, Auth_1.verifyTokenStored, warehouseController_1.createWarehouse);
router
    .route(routes_1.warehouse_routes.FETCH_DELETE_WAREHOUSE)
    .get(warehouseController_1.getWarehouse)
    .delete(Auth_1.verifyUserToken, Auth_1.verifyTokenStored, warehouseController_1.deleteWarehouse);
exports.default = router;
