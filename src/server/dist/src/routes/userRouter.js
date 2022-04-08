"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../constants/enums/routes");
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const Auth_1 = require("../middlewares/Auth");
//http:localhost:3000/users/
router.route('/').get(Auth_1.verifyUserToken, Auth_1.verifyTokenStored, Auth_1.verifyAdmin, userController_1.getAllUsers);
router.route(routes_1.user_routes.LOGIN_USER).post(userController_1.authUser);
router.route(routes_1.user_routes.REGISTER_USER).post(userController_1.createUser);
router.route(routes_1.user_routes.LOGOUTUSER_USER).post(Auth_1.verifyUserToken, Auth_1.verifyTokenStored, userController_1.logoutUser);
router
    .route(routes_1.user_routes.DELETEUSER_USER)
    .delete(Auth_1.verifyUserToken, Auth_1.verifyTokenStored, Auth_1.verifyAdmin, userController_1.deleteUser);
exports.default = router;
