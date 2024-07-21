import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'lamhoainhon@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login success'
    })
  }
  return res.status(400).json({
    message: 'Login error'
  })
}
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  return res.json({
    message: 'Login success',
    result: result
  })
}
