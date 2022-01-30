import { Model, DataTypes, Optional } from 'sequelize'
import bcrypt from 'bcrypt'
import sequelize from '../config/pgsql'
import { hashPass } from '../utils/hashedPassword'
import jwt from 'jsonwebtoken'
import { getRedisValue, setRedisValue } from '../utils/redisUtils'
import { UserAttributes } from '../constants/types'

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
})

User.beforeBulkCreate(async (users, options) => {
  let hashedPassword
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

// Class Methods
export async function findByCredentials(
  email: string,
  password: string
): Promise<UserAttributes | null> {
  const user = await User.findOne({ where: { email } })

  if (!user || !(user instanceof User)) {
    throw new Error('Unable to login, User not found')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Password invalid')
  }

  return user
}

// Instance Methods
export async function generateJWTAuthToken(user: UserAttributes): Promise<string> {
  if (!user.id) throw new Error('user id invalid')

  const token = jwt.sign({ id: user.id.toString() }, 'verysecretjwttokenmsg', {
    expiresIn: '2d',
  })

  if (!token) throw new Error('Token Creation Error')

  const key = await getRedisValue(user.id.toString())

  if (!key) setRedisValue(user.id.toString(), { token })

  return token
}

export default User
