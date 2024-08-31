import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { config } from 'dotenv'
import { LikeReqBody, UnLikeReqParams } from '~/models/requests/Like.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import databaseService from '~/services/database.services'
import likesServices from '~/services/likes.services'
import { LIKE_MESSAGES } from '~/constants/messages'

config()

export const likeController = async (req: Request<ParamsDictionary, any, LikeReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const result = await likesServices.likeTweet(user_id, tweet_id)
  return res.json({
    message: LIKE_MESSAGES.LIKE_SUCCESSFULLY,
    result
  })
}
export const unLikeController = async (req: Request<UnLikeReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.params
  const result = await likesServices.unLikeTweet(user_id, tweet_id)
  return res.json(result)
}
