import { NextFunction, Request, Response } from 'express'
import { Method } from '../constants/enums/enums'

const notFoundRoute = (req: Request, res: Response) => {
  res.status(404).send({ message: `Route not found - ${req.originalUrl}` })
}

exports.errorRouteMiddleware = notFoundRoute
