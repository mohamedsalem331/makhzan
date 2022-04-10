"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initializeServer_1 = __importDefault(require("./initializeServer"));
require("./db");
const userModel_1 = __importDefault(require("./models/userModel"));
const warehouseModel_1 = __importDefault(require("./models/warehouseModel"));
const port = process.env.PORT || 5000;
const app = (0, initializeServer_1.default)();
userModel_1.default.hasMany(warehouseModel_1.default);
warehouseModel_1.default.belongsTo(userModel_1.default);
app.listen(port, () => console.log(`Server Listening on port ${port}`)); // eslint-disable-line
