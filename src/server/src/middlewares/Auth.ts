import jwt from 'jsonwebtoken'
import redis_client from '../config/redis'
import { Request, Response, NextFunction } from 'express'
import { getRedisValue, setRedisValue, delRedisValue } from '../utils/redisUtils'
import User from '../models/userModel'

const verifyUserToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.header('Authorization')?.replace('Bearer ', '')

    if (!token) throw new Error('Token is Invalid')

    const decoded = jwt.verify(token, 'verysecretjwttokenmsg')
    console.log(decoded)

    // const user = User.findByPk(decoded.id.toString())

    // if (!user) throw new Error('Authentication Failed')

    // const data = getRedisValue('BL_' + decoded.id)

    // if (data === token) return res.status(401).send({ message: 'blacklisted token.' })

    req.userData = decoded
    req.token = token
    next()
  } catch (e: any) {
    return res.status(401).send({ message: 'Your session1 is not valid. ' + e.message })
  }
}

const verifyTokenStored = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getRedisValue(req?.userData?.id)

    if (data === null)
      return res.status(401).send({ message: 'Invalid request. Token is not in store.' })

    if (JSON.parse(data).token !== req.token)
      return res.status(401).send({ message: 'Invalid request. Token is not same in store.' })

    next()
  } catch (e: any) {
    return res.status(401).send({ message: 'Your session is not valid. ' + e.message })
  }
}

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.userData && req.userData.isAdmin) {
    next()
  } else {
    return res.status(401).send({ message: 'You are not an Admin' })
  }
}

export { verifyUserToken, verifyTokenStored, verifyAdmin }
