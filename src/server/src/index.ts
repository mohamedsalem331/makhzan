import initializeServer from './initializeServer'
import { Router } from 'express'

const router = Router()

const app = initializeServer(router)

app.listen(5000, () => console.log(`Listening on port ${5000}`)) // eslint-disable-line
