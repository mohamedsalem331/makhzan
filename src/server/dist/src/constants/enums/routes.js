"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warehouse_routes = exports.user_routes = void 0;
var user_routes;
(function (user_routes) {
    user_routes["LOGIN_USER"] = "/login";
    user_routes["REGISTER_USER"] = "/register";
    user_routes["LOGOUTUSER_USER"] = "/logout";
    user_routes["DELETEUSER_USER"] = "/delete/:id";
})(user_routes = exports.user_routes || (exports.user_routes = {}));
var warehouse_routes;
(function (warehouse_routes) {
    warehouse_routes["CREATE_WAREHOUSE"] = "/create";
    warehouse_routes["FETCH_DELETE_WAREHOUSE"] = "/:id";
})(warehouse_routes = exports.warehouse_routes || (exports.warehouse_routes = {}));
