import { Model, DataTypes, Optional } from 'sequelize'
import bcrypt from 'bcrypt'
import sequelize from '../config/pgsql'
import { hashPass } from '../utils/hashedPassword'
import jwt from 'jsonwebtoken'
import { setRedisValue } from '../utils/redisUtils'
import { UserAttributes } from '../constants/types'

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

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
  phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
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
    throw new Error('Unable to login, Wrong Email or Password')
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
    expiresIn: '6d',
  })

  if (!token) throw new Error('Token Creation Failed')

  await setRedisValue(user.id.toString(), { token })

  return token
}

export default User
