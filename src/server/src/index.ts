import initializeServer from './initializeServer'
import { Router } from 'express'

import User from './models/userModel'
import Warehouse from './models/warehouseModel'

const port = process.env.PORT || 5000

const router = Router()

const app = initializeServer()

import './db/script'

User.hasMany(Warehouse)
Warehouse.belongsTo(User)

app.listen(port, () => console.log(`Server Listening on port ${port}`)) // eslint-disable-line
