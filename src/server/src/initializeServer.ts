import express, { Router } from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'

import { notFoundRoute } from './middlewares/errors'
import userRouter from './routes/userRouter'
import warehouseRouter from './routes/warehouseRouter'
import uploadRouter from './routes/uploadRouter'

export default function initializeServer() {
  const app = express()

  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cors())
  app.use(compression())

  app.use(express.static(__dirname + '/uploads'))

  app.use('/api/users', userRouter)
  app.use('/api/warehouses', warehouseRouter)
  app.use('/api/uploads', uploadRouter)
  app.use(notFoundRoute)

  return app
}
