import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../config/pgsql'
import { hashPass } from '../utils/hashPassword'

interface UserAttributes {
  id?: number
  name: string
  email: string
  password: string
  phoneNumber: number
  isAdmin?: boolean
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.INTEGER, allowNull: false },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
})

User.beforeBulkCreate(async (users, options) => {
  let hashedPassword
  console.log(hashedPassword)
  await Promise.all(
    users.map(async (user) => {
      hashedPassword = await hashPass(user.password)
      user.password = hashedPassword
    })
  )
})

User.beforeCreate(async (user, options) => {
  const hashedPassword = await hashPass(user.password)
  user.password = hashedPassword
})

export default User
