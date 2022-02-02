import { Request, Response } from 'express'

export const notFoundRoute = (req: Request, res: Response) => {
  res.status(404).send({ message: `Route not found - ${req.originalUrl}` })
}
