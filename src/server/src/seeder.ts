import sequelize from './config/pgsql'
import User from './models/userModel'
import Warehouse from './models/warehouseModel'
import UserMockData from './utils/data/users'
import WarehouseMockData from './utils/data/warehouses'

const importData = async (): Promise<void> => {
  try {
    await sequelize.sync()
    await User.bulkCreate(UserMockData)
    await Warehouse.bulkCreate(WarehouseMockData)
    console.log('data created')
  } catch (e) {
    console.log(e)
  }
  process.exit(0)
}

const destoryData = async () => {
  try {
    await sequelize.sync()
    await Warehouse.drop()
    await User.drop()
    console.log('data destroyed')
  } catch (e) {
    console.log(e)
  }
  process.exit(0)
}

if (process.argv[2] === '-populate') {
  importData()
} else if (process.argv[2] === '-destroy') {
  destoryData()
}
