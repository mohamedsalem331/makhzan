import sequelize from './config/pgsql'
import User from './models/userModel'
import Warehouse from './models/warehouseModel'
import UserMockData from './utils/data/users'
import WarehouseMockData from './utils/data/warehouses'

const importData = async (): Promise<void> => {
  try {
    await sequelize.sync()
    // await User.bulkCreate(UserMockData)
    await Warehouse.bulkCreate(WarehouseMockData)
    console.log('data created')
  } catch (e) {
    console.log(e)
  }
  process.exit(1)
}

const destoryData = async () => {
  console.log('data destroyed')
  try {
    // await User.drop()
  } catch (e) {
    console.log(e)
  }
  process.exit(1)
}

if (process.argv[2] === '-populate') {
  importData()
} else if (process.argv[2] === '-destroy') {
  destoryData()
}
