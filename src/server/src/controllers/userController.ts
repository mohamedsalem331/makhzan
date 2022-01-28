import express, { Request, Response } from 'express'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req: Request, res: Response) => {
  return res.send({ message: 'post req' })
}

const fdsfds = async (req: Request, res: Response) => {
  return res.send({ message: 'get req' })
}

export { authUser, fdsfds }
