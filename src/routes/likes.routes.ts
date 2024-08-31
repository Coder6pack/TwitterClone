import { Router } from 'express'
import { likeController, unLikeController } from '~/controllers/likes.controllers'
import { tweetIValidator } from '~/middlewares/tweets.middlewarves'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const likesRouter = Router()

/**
 * Description: Create like tweet
 * Path: /
 * Method: POST
 * Header: { Authorization: access_token:string  }
 * Body: { user_id:string, tweet_id:string }
 */

likesRouter.post('', accessTokenValidator, verifiedUserValidator, tweetIValidator, wrapRequestHandler(likeController))

/**
 * Description: Create like tweet
 * Path: /:tweet_id
 * Method: POST
 * Header: { Authorization: access_token:string  }
 * Body: { user_id:string, tweet_id:string }
 */

likesRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIValidator,
  wrapRequestHandler(unLikeController)
)

export default likesRouter
