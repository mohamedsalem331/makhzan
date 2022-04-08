import { Sequelize } from 'sequelize'
require('dotenv').config()
const env = process.env.NODE_ENV || 'development'

const config = require(__dirname + '/config.js')['config'][env]

const { username, password, database, host } = config
const pass = password ?? ''

const sequelize = new Sequelize(database, username, pass, {
  host,
  dialect: 'postgres',
  port: 5432,
  logging: false,
})

export default sequelize
