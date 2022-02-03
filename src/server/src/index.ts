import initializeServer from './initializeServer'
import sequelize from './config/pgsql'
import { Router } from 'express'
import redis_client from './config/redis'

import User from './models/userModel'
import Warehouse from './models/warehouseModel'
import { Op } from 'sequelize'

require('dotenv').config()

const port = process.env.PORT || 5000

const router = Router()

const app = initializeServer(router)

;(async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    console.log('Database Connected Successfully.')
  } catch (error) {
    sequelize.close()
    process.exit(1)
  }
})()
;(async (): Promise<void> => {
  redis_client.on('error', (err) => console.log('Redis redis_client Error', err))
  try {
    await redis_client.connect()
    console.log('Redis Connected Successfully.')
  } catch (e) {
    process.exit(1)
  }
})()

User.hasMany(Warehouse)
Warehouse.belongsTo(User)

app.listen(port, () => console.log(`Server Listening on port ${port}`)) // eslint-disable-line
