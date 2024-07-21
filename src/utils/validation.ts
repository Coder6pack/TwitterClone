import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'

// can be reused by many routes
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)

    const err = validationResult(req)

    // Nếu mà không có lỗi thì next
    if (err.isEmpty()) {
      return next()
    }

    return res.status(400).json({
      errors: err.mapped()
    })
  }
}
