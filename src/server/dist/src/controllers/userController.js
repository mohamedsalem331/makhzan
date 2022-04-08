"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getAllUsers = exports.deleteUser = exports.logoutUser = exports.createUser = exports.authUser = void 0;
const userModel_1 = __importStar(require("../models/userModel"));
const warehouseModel_1 = __importDefault(require("../models/warehouseModel"));
const sequelize_1 = require("sequelize");
const redisUtils_1 = require("../utils/redisUtils");
// 400 Bad Request -> The 400 status code, or Bad Request error, means the HTTP request that was sent to the server has invalid syntax.
// 401 unauthneticated
// 403 unauthorized
// @desc    fetch all users
// @route   GET /users
// @access  Private/Admin
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield userModel_1.default.findAll();
        if (!users)
            throw new Error('Couldnt retreive all users');
        res.status(200).send({ users });
    }
    catch (e) {
        let errorMessage = 'Wrong Credentials';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        res.status(403).send({ error: e.message });
    }
});
exports.getAllUsers = getAllUsers;
// @desc    Auth user & Get token
// @route   POST users/login
// @access  Public
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, userModel_1.findByCredentials)(email, password);
        if (!user) {
            throw new Error('Authentication Failed');
        }
        const token = yield (0, userModel_1.generateJWTAuthToken)(user);
        if (!token)
            throw new Error('Generating Token Failed');
        res.status(200).send({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token,
        });
    }
    catch (e) {
        console.log(e);
        let errorMessage = 'Wrong Credentials';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        res.status(401).send({ error: e.message });
    }
});
exports.authUser = authUser;
// @desc    Create/Auth User & Get token
// @route   POST /users/register
// @access  Public
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const NewUser = req.body;
        const existingUser = yield userModel_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [{ email: NewUser.email }, { phoneNumber: NewUser.phoneNumber }],
            },
        });
        if (existingUser) {
            throw new Error('User already Exists, Try different Phone number or Email Address');
        }
        const user = yield userModel_1.default.create(NewUser);
        if (!user || !(user instanceof userModel_1.default))
            throw new Error('Error happened with User Creation');
        const token = yield (0, userModel_1.generateJWTAuthToken)(user);
        if (!token)
            throw new Error('Generating Token Failed');
        res.status(201).send({
            message: 'User Created',
            token,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        });
    }
    catch (e) {
        let errorMessage = 'User not created, Failed Operation';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        res.status(400).send({ error: e.message });
    }
});
exports.createUser = createUser;
// @desc    logout user & Blacklist token
// @route   POST /users/logout
// @access  Private
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const token = res.locals.token;
        if (!user || !token)
            throw new Error('User or Token is invalid');
        // remove the refresh token
        yield (0, redisUtils_1.delRedisValue)(user.id.toString());
        // blacklist current access token
        yield (0, redisUtils_1.setRedisValue)('BL_' + user.id.toString(), { token });
        res.status(200).send({ message: 'User Logged out' });
    }
    catch (e) {
        let errorMessage = 'Logging User out, failed operation';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        res.status(403).send({ error: e.message });
    }
});
exports.logoutUser = logoutUser;
// @desc    delete user by id
// @route   DELETE /users/delete/:id
// @access  Private/Admin
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield userModel_1.default.destroy({
            where: {
                id,
            },
        });
        yield warehouseModel_1.default.destroy({
            where: {
                UserId: id,
            },
        });
        res.status(200).send({ message: 'User Deleted With Associated warehouses' });
    }
    catch (e) {
        let errorMessage = 'Deleting user failed';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        res.status(403).send({ error: e.message });
    }
});
exports.deleteUser = deleteUser;
