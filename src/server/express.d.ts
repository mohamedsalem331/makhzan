import { UserAttributes } from './src/constants/types'

declare namespace Express {
  export interface Request {
    userData?: object
    token?: string
  }
}
