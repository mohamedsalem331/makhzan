import express, { Request, Response } from 'express'
import User, { findByCredentials, generateJWTAuthToken } from '../models/userModel'
import { UserAttributes } from '../constants/types'
import { Op } from 'sequelize'
import { setRedisValue, delRedisValue } from '../utils/redisUtils'

// 400 Bad Request -> The 400 status code, or Bad Request error, means the HTTP request that was sent to the server has invalid syntax.
// 401 unauthneticated
// 403 unauthorized

// @desc    Auth user & Get token
// @route   POST /login
// @access  Public
const authUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await findByCredentials(email, password)

    if (!user) {
      throw new Error('Authentication Failed')
    }

    const token = await generateJWTAuthToken(user)

    res
      .status(200)
      .send({ email: user.email, username: user.name, phoneNumber: user.phoneNumber, token })
  } catch (e: any) {
    let errorMessage = 'Wrong Credentials'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: e.message })
  }
}

// @desc    Create/Auth User & Get token
// @route   POST /register
// @access  Public
const createUser = async (req: Request, res: Response) => {
  const NewUser: UserAttributes = req.body
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: NewUser.email }, { phoneNumber: NewUser.password }],
      },
    })

    if (existingUser) {
      return res.status(400).send({ message: 'User already Exists' })
    }

    const user = await User.create(NewUser)

    if (!user) {
      return res.status(401).send({ message: 'Error happened with User Creation' })
    }

    const token = await generateJWTAuthToken(user)

    res.status(200).send({ message: 'User Created', token })
  } catch (e: any) {
    let errorMessage = 'User not created'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: e.message })
  }
}

// @desc    logout user & Blacklist token
// @route   POST /logout
// @access  Private
const logoutUser = async (req: Request, res: Response) => {
  try {
    const user = req.userData
    const token = req.token

    // remove the refresh token
    await delRedisValue(user.id.toString())

    // blacklist current access token
    await setRedisValue('BL_' + user.id.toString(), { token })

    res.status(200).send({ message: 'User Logged out' })
  } catch (e: any) {
    let errorMessage = 'Wrong Credentials'
    if (e instanceof Error) {
      errorMessage = e.message
    }
    res.status(400).send({ error: e.message })
  }
}

export { authUser, createUser, logoutUser }
