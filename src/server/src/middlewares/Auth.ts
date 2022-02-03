const jwt = require('jsonwebtoken')
import redis_client from '../config/redis'
import { Request, Response, NextFunction } from 'express'
import { getRedisValue, setRedisValue, delRedisValue } from '../utils/redisUtils'
import User from '../models/userModel'
import { JwtPayload } from 'jsonwebtoken'

interface IDecoded extends JwtPayload {
  id: string
  iat: number
  exp: number
}

const verifyUserToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.header('Authorization')?.replace('Bearer ', '')

    if (!token) throw new Error('Token is Invalid')

    const decoded: IDecoded = await jwt.verify(token, 'verysecretjwttokenmsg')

    if (!decoded) throw new Error()

    const user = await User.findByPk(decoded.id)

    if (!user) throw new Error('Authentication Failed')

    const data = await getRedisValue('BL_' + decoded.id)

    if (data === token) return res.status(401).send({ message: 'blacklisted token.' })

    res.locals.user = decoded
    res.locals.token = token

    next()
  } catch (e: any) {
    const errorMessage = 'Please Authenticate'
    return res
      .status(401)
      .send({ message: 'Your session1 is not valid. ' + e.message ?? errorMessage })
  }
}

const verifyTokenStored = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = res.locals.user
    const token = res.locals.token

    const data = await getRedisValue(userData?.id)

    if (data === null) {
      return res.status(401).send({ message: 'Invalid request. Token is not in store.' })
    }

    if (JSON.parse(data).token !== token) {
      return res.status(401).send({ message: 'Invalid request. Token is not same in store.' })
    }

    next()
  } catch (e: any) {
    const errorMessage = 'Please Authenticate'
    return res
      .status(401)
      .send({ message: 'Your session is not valid. ' + e.message ?? errorMessage })
  }
}

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userData = res.locals.user

  if (userData && userData.isAdmin) {
    next()
  } else {
    return res.status(401).send({ message: 'UnAuthorized You are not an Admin' })
  }
}

export { verifyUserToken, verifyTokenStored, verifyAdmin }
