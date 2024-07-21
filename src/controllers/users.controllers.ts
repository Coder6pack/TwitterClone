import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = async (req: Request, res: Response) => {
  const { user }: any = req
  const user_id = user._id
  throw new Error('loi controller')
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: 'Login success',
    result: result
  })
}
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await usersService.register(req.body)
  return res.json({
    message: 'Register success',
    result: result
  })
}
