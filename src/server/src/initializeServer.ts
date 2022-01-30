import path from 'path'
import express, { Router } from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'

import userRouter from './routes/userRouter'

export default function initializeServer(router: Router) {
  const app = express()
  const isProduction = process.env.NODE_ENV === 'production'
  const origin = { origin: isProduction ? false : '*' }

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cors(origin))
  app.use(compression())

  // app.use(express.static(path.join(__dirname, '../../dist/')))

  // express routers
  app.use(userRouter)
  // app.use(taskRouter)

  return app
}
