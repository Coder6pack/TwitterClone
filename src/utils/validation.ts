import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

// can be reused by many routes
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)

    const err = validationResult(req)
    const errorObject = err.mapped()
    const entityError = new EntityError({ error: {} })
    // Nếu mà không có lỗi thì next
    if (err.isEmpty()) {
      return next()
    }

    for (const key in errorObject) {
      const { msg } = errorObject[key]
      // Kiểm tra lỗi bình thường
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      // Bắt lỗi entity error
      entityError.error[key] = errorObject[key].msg
    }
    next(entityError)
  }
}
