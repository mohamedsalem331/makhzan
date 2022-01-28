import initializeServer from './initializeServer'
import sequelize from './config/pgsql'
import { Router } from 'express'

const port = process.env.PORT || 5000

const router = Router()

const app = initializeServer(router)

;(async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    console.log('Database Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    sequelize.close()
    process.exit()
  }
})()

app.listen(port, () => console.log(`Listening on port ${port}`)) // eslint-disable-line
