"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const errors_1 = require("./middlewares/errors");
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const warehouseRouter_1 = __importDefault(require("./routes/warehouseRouter"));
const uploadRouter_1 = __importDefault(require("./routes/uploadRouter"));
function initializeServer() {
    const app = (0, express_1.default)();
    const isProduction = process.env.NODE_ENV === 'production';
    const origin = { origin: isProduction ? false : '*' };
    if (process.env.NODE_ENV === 'development')
        app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cors_1.default)(origin));
    app.use((0, compression_1.default)());
    app.use(express_1.default.static(__dirname + '/uploads'));
    app.use('/users', userRouter_1.default);
    app.use('/warehouses', warehouseRouter_1.default);
    app.use('/uploads', uploadRouter_1.default);
    app.use(errors_1.notFoundRoute);
    return app;
}
exports.default = initializeServer;
