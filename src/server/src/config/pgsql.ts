import { Sequelize } from 'sequelize'
require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

let config

if (env === 'production') {
  config = require(__dirname + '/config.js')['config'][env]
} else {
  config = require(__dirname + '/config.ts')['config'][env]
}

const { username, password, database, host } = config

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  port: 5432,
  logging: false,
})

export default sequelize
