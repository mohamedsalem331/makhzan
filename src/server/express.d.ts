declare namespace Express {
  const jwt = require('jsonwebtoken')
  export interface Request {
    userData?: jwt.JwtPayload
    token?: string
  }
}
