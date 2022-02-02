declare namespace Express {
  import jwt from 'jsonwebtoken'
  export interface Request {
    userData?: jwt.JwtPayload
    token?: string
  }
}
