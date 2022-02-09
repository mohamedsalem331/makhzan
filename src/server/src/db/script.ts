import sequelize from '../config/pgsql'
import redis_client from '../config/redis'
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
