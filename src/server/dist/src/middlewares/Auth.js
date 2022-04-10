"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyTokenStored = exports.verifyUserToken = void 0;
const jwt = require('jsonwebtoken');
const redisUtils_1 = require("../utils/redisUtils");
const userModel_1 = __importDefault(require("../models/userModel"));
const verifyUserToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = (_a = req === null || req === void 0 ? void 0 : req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token)
            throw new Error('Token is Invalid');
        const decoded = yield jwt.verify(token, 'verysecretjwttokenmsg');
        const user = yield userModel_1.default.findByPk(decoded.id);
        if (!user || !decoded)
            throw new Error('Authentication Failed');
        const data = yield (0, redisUtils_1.getRedisValue)('BL_' + decoded.id);
        if (data === token)
            return res.status(401).send({ error: 'blacklisted token.' });
        res.locals.user = user;
        res.locals.token = token;
        next();
    }
    catch (e) {
        const errorMessage = 'Please Authenticate';
        return res
            .status(401)
            .send({ error: (_b = 'Your session is not valid. ' + e.message) !== null && _b !== void 0 ? _b : errorMessage });
    }
});
exports.verifyUserToken = verifyUserToken;
const verifyTokenStored = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userData = res.locals.user;
        const token = res.locals.token;
        const data = yield (0, redisUtils_1.getRedisValue)(userData === null || userData === void 0 ? void 0 : userData.id);
        if (data === null) {
            return res.status(401).send({ error: 'Invalid request. Token is not in store.' });
        }
        if (JSON.parse(data).token !== token) {
            return res.status(401).send({ error: 'Invalid request. Token not equal one in redis store.' });
        }
        next();
    }
    catch (e) {
        const errorMessage = 'Please Authenticate';
        return res
            .status(401)
            .send({ error: (_c = 'Your session is not valid. ' + e.message) !== null && _c !== void 0 ? _c : errorMessage });
    }
});
exports.verifyTokenStored = verifyTokenStored;
const verifyAdmin = (req, res, next) => {
    const userData = res.locals.user;
    if (userData && userData.isAdmin) {
        next();
    }
    else {
        return res.status(403).send({ error: 'UnAuthorized You are not an Admin' });
    }
};
exports.verifyAdmin = verifyAdmin;
