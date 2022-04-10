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
exports.filterAllWarehouses = exports.deleteWarehouse = exports.createWarehouse = exports.getWarehouse = exports.getAllWarehouses = void 0;
const warehouseModel_1 = __importDefault(require("../models/warehouseModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const sequelize_1 = require("sequelize");
var _ = require('lodash');
// 400 Bad Request -> The 400 status code, or Bad Request error, means the HTTP request that was sent to the server has invalid syntax.
// 401 unauthneticated
// 403 unauthorized
// @desc    fetch all warehouses
// @route   GET /warehouses
// @access  Public
const getAllWarehouses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let warehouses = [];
    let userWarehouses = [];
    let UserId;
    const maxRent = yield warehouseModel_1.default.max('rent');
    const maxSize = yield warehouseModel_1.default.max('size');
    try {
        UserId = req === null || req === void 0 ? void 0 : req.header('UserID');
        warehouses = yield warehouseModel_1.default.findAll();
        if (UserId) {
            userWarehouses = yield warehouseModel_1.default.findAll({
                where: {
                    UserId,
                },
            });
            warehouses = _.filter(warehouses, function (storage_unit) {
                return storage_unit.UserId !== UserId;
            });
        }
        if (!warehouses ||
            !userWarehouses ||
            !warehouses.every((warehouse) => warehouse instanceof warehouseModel_1.default)) {
            throw new Error('Couldnt retreive all warehouses');
        }
        res.status(200).send({ warehouses: [...userWarehouses, ...warehouses], maxRent, maxSize });
    }
    catch (e) {
        let errorMessage = 'Something went wrong, couldnt fetch warehouses';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        res.status(400).send({ error: e.message });
    }
});
exports.getAllWarehouses = getAllWarehouses;
// @desc    filter  warehouses
// @route   POST /warehouses
// @access  Public
const filterAllWarehouses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let warehouses;
    try {
        const { governorates, locations, rent, size } = req.body;
        console.log(typeof req.body.size[0]);
        if (!req.body)
            throw new Error('error happened -> filtering warehouses');
        const maxRent = yield warehouseModel_1.default.max('rent');
        const maxSize = yield warehouseModel_1.default.max('size');
        // using sequalize queries we filter warehouses based on filter req.body
        warehouses = yield warehouseModel_1.default.findAll({
            where: {
                rent: {
                    [sequelize_1.Op.between]: rent && rent[0] + rent[1] > 0 && rent[1] > rent[0] ? rent : [rent[0], maxRent]
                },
                size: {
                    [sequelize_1.Op.between]: size && size[0] + size[1] > 0 && size[1] > size[0] ? size : [size[0], maxSize]
                },
                governorate: {
                    [sequelize_1.Op.or]: governorates,
                },
                location: {
                    [sequelize_1.Op.or]: locations,
                },
            },
        });
        if (!warehouses || !warehouses.every((warehouse) => warehouse instanceof warehouseModel_1.default)) {
            throw new Error('Couldnt filter all warehouses');
        }
        res.status(200).send({ warehouses });
    }
    catch (e) {
        let errorMessage = 'Something went wrong, filtering warehouses';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        res.status(400).send({ error: errorMessage });
    }
});
exports.filterAllWarehouses = filterAllWarehouses;
// @desc    post/create a warehouse
// @route   POST /warehouses/create
// @access  Private
const createWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = res.locals.user;
        if (!userData)
            throw new Error("Authentication invalid");
        const NewWarehouse = req.body;
        const warehouse = yield warehouseModel_1.default.create(Object.assign(Object.assign({}, NewWarehouse), { UserId: userData.id }));
        if (!warehouse || !(warehouse instanceof warehouseModel_1.default)) {
            throw new Error('Error happened with Creaing Warehouse Instance');
        }
        res.status(201).send({ message: 'Warehouse Created' });
    }
    catch (e) {
        let errorMessage = 'Unable to create Warehouse';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        res.status(400).send({ error: e.message });
    }
});
exports.createWarehouse = createWarehouse;
// @desc    fetch warehouse by id
// @route   GET /warehouses/:id
// @access  Public
const getWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const warehouse = yield warehouseModel_1.default.findByPk(id);
        if (!warehouse || !(warehouse instanceof warehouseModel_1.default))
            throw new Error('Warehouse not found');
        const user = yield userModel_1.default.findByPk(warehouse.UserId, { attributes: ['name', 'email', 'phoneNumber'] });
        if (!user || !(user instanceof userModel_1.default))
            throw new Error('Associated User not found');
        res.status(200).send({ warehouse, user });
    }
    catch (e) {
        console.log(e);
        let errorMessage = 'Unable to fetch warehouse';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        res.status(400).send({ error: e.message });
    }
});
exports.getWarehouse = getWarehouse;
// @desc    delete warehouse by id
// @route   DELETE /warehouses/:id
// @access  Private
const deleteWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    let warehouse;
    try {
        const id = req.params.id;
        user = res.locals.user;
        if (!user || !(user instanceof userModel_1.default)) {
            throw new Error('User Not Found or Unauthorized to Delete this associated warehouse');
        }
        warehouse = yield warehouseModel_1.default.findByPk(id);
        if (user.id !== (warehouse === null || warehouse === void 0 ? void 0 : warehouse.UserId)) {
            throw new Error('Unauthorized operation');
        }
        yield warehouseModel_1.default.destroy({
            where: {
                id,
            },
        });
        res.status(200).send({ message: 'Warehouse deleted' });
    }
    catch (e) {
        let errorMessage = 'Unable to delete the warehouse';
        if (e instanceof Error) {
            errorMessage = e.message;
        }
        res.status(403).send({ error: e.message });
    }
});
exports.deleteWarehouse = deleteWarehouse;
