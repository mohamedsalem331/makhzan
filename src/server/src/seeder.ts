import { hashPass } from './utils/hashPassword'
import sequelize from './config/pgsql'
import User from './models/userModel'
import UserMockData from './utils/data/users'

const importData = async (): Promise<void> => {
  try {
    await sequelize.sync()
    await User.bulkCreate(UserMockData)
  } catch (e) {
    console.log(e)
  }
  process.exit()
}

const destoryData = async () => {
  console.log('i ran')
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
  console.log('i ranfds')
  destoryData()
}
