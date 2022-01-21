import path from 'path'
import express, { Router } from 'express'
import cors from 'cors'
import morgan from 'morgan'

export default function initializeServer(router: Router) {
  const app = express()
  const isProduction = process.env.NODE_ENV === 'production'
  const origin = { origin: isProduction ? false : '*' }

  app.use(express.json())
  app.use(cors(origin))

  return app
}