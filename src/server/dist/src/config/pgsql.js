"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config.ts')['config'][env];
const { username, password, database, host } = config;
const pass = password !== null && password !== void 0 ? password : '';
const sequelize = new sequelize_1.Sequelize(database, username, pass, {
    host,
    dialect: 'postgres',
    port: 5432,
    logging: false,
});
exports.default = sequelize;
