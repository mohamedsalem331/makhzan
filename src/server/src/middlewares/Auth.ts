import jwt from 'jsonwebtoken'
import redis_client from '../config/redis'
import { Request, Response, NextFunction } from 'express'
import { getRedisValue, setRedisValue, delRedisValue } from '../utils/redisUtils'
import User from '../models/userModel'

const verifyUserToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    const decoded = jwt.verify(token, 'verysecretjwttokenmsg')

    // const user = User.findByPk(decoded.id)

    // if (!user) {
    //     throw new Error("Authentication Failed")
    // }

    console.log(decoded)

    // const data = getRedisValue('BL_' + decoded.id)

    // if(data === token) return res.status(401).send({message: "blacklisted token."});

    req.userData = decoded
    req.token = token
    next()
  } catch (e: any) {
    return res.status(401).send({ message: 'Your session1 is not valid. ' + e.message })
  }
}

const verifyTokenStored = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await getRedisValue(req.userData.id)

    if (data === null)
      return res.status(401).send({ message: 'Invalid request. Token is not in store.' })

    if (JSON.parse(data).token !== req.token)
      return res.status(401).send({ message: 'Invalid request. Token is not same in store.' })

    next()
  } catch (e: any) {
    return res.status(401).send({ message: 'Your session is not valid. ' + e.message })
  }
}

export { verifyUserToken, verifyTokenStored }
