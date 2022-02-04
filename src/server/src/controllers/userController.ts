import { Request, Response } from 'express'
import User, { findByCredentials, generateJWTAuthToken } from '../models/userModel'
import { UserAttributes } from '../constants/types'
import { Op } from 'sequelize'
import { delRedisValue, setRedisValue } from '../utils/redisUtils'

// 400 Bad Request -> The 400 status code, or Bad Request error, means the HTTP request that was sent to the server has invalid syntax.
// 401 unauthneticated
// 403 unauthorized

// @desc    fetch all users
// @route   GET /users
// @access  Private/Admin
const getAllUsers = async (req: Request, res: Response) => {
  let users
  try {
    users = await User.findAll()

    if (!users) throw new Error('Couldnt retreive all users')

    res.status(200).send({ users })
  } catch (e: any) {
    let errorMessage = 'Wrong Credentials'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(403).send({ error: e.message })
  }
}

// @desc    Auth user & Get token
// @route   POST users/login
// @access  Public
const authUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await findByCredentials(email, password)

    if (!user) {
      throw new Error('Authentication Failed')
    }

    const token = await generateJWTAuthToken(user)

    if (!token) throw new Error('Generating Token Failed')

    res.status(200).send({ user, token })
  } catch (e: any) {
    console.log(e)

    let errorMessage = 'Wrong Credentials'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(401).send({ error: e.message })
  }
}

// @desc    Create/Auth User & Get token
// @route   POST /users/register
// @access  Public
const createUser = async (req: Request, res: Response) => {
  try {
    const NewUser: UserAttributes = req.body

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: NewUser.email }, { phoneNumber: NewUser.phoneNumber }],
      },
    })

    if (existingUser) {
      throw new Error('User already Exists, Try different Phone number or Email Address')
    }

    const user = await User.create(NewUser)

    if (!user || !(user instanceof User)) throw new Error('Error happened with User Creation')

    const token = await generateJWTAuthToken(user)

    if (!token) throw new Error('Generating Token Failed')

    res.status(201).send({ message: 'User Created', token, NewUser })
  } catch (e: any) {
    let errorMessage = 'User not created, Failed Operation'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: e.message })
  }
}

// @desc    logout user & Blacklist token
// @route   POST /users/logout
// @access  Private
const logoutUser = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    const token = res.locals.token

    if (!user || !token) throw new Error('User or Token is invalid')

    // remove the refresh token
    await delRedisValue(user.id.toString())

    // blacklist current access token
    await setRedisValue('BL_' + user.id.toString(), { token })

    res.status(200).send({ message: 'User Logged out' })
  } catch (e: any) {
    let errorMessage = 'Logging User out, failed operation'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(403).send({ error: e.message })
  }
}

// @desc    delete user by id
// @route   DELETE /users/delete/:id
// @access  Private/Admin
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id

    await User.destroy({
      where: {
        id,
      },
    })

    res.status(200).send({ message: 'User Deleted' })
  } catch (e: any) {
    let errorMessage = 'Deleting user failed'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(403).send({ error: e.message })
  }
}

export { authUser, createUser, logoutUser, deleteUser, getAllUsers }
