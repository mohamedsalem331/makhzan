import { Sequelize } from 'sequelize'
require('dotenv').config()
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/config.json')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: 5432,
  logging: false,
})

export default sequelize
