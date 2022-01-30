import sequelize from './config/pgsql'
import User from './models/userModel'
import UserMockData from './utils/data/users'

const importData = async (): Promise<void> => {
  try {
    await sequelize.sync()
    await User.bulkCreate(UserMockData)
    console.log('data created')
  } catch (e) {
    console.log(e)
  }
  process.exit()
}

const destoryData = async () => {
  console.log('data destroyed')
  try {
    await User.drop()
  } catch (e) {
    console.log(e)
  }
  process.exit()
}

if (process.argv[2] === '-populate') {
  importData()
} else if (process.argv[2] === '-destroy') {
  destoryData()
}
