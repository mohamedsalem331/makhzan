"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
let config;
if (env === 'production') {
    config = require(__dirname + '/config.js')['config'][env];
}
else {
    config = require(__dirname + '/config.ts')['config'][env];
}
const { username, password, database, host } = config;
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host,
    dialect: 'postgres',
    port: 5432,
    logging: false,
});
exports.default = sequelize;
