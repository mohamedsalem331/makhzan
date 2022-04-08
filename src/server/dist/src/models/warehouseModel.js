"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgsql_1 = __importDefault(require("../config/pgsql"));
const Warehouse = pgsql_1.default.define('Warehouse', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING(600), allowNull: false },
    size: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    rent: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    governorate: { type: sequelize_1.DataTypes.STRING, defaultValue: 'cairo' },
    location: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    street: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    services: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING), allowNull: false },
    images: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING), allowNull: false },
    UserId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
});
exports.default = Warehouse;
