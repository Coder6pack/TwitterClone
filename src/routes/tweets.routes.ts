import { Router } from 'express'
import {
  createTweetController,
  getTweetDetailController,
  getTweetChildrenController,
  getNewFeedController
} from '~/controllers/tweets.controllers'
import {
  audienceValidator,
  createTweetValidator,
  isUserLoggedValidator,
  tweetIValidator,
  getTweetChildrenValidator,
  paginationValidator
} from '~/middlewares/tweets.middlewarves'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()
/**
 * Description: Create tweet
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { TweetReqBody}
 */
tweetsRouter.post(
  '/',
  isUserLoggedValidator(accessTokenValidator),
  isUserLoggedValidator(verifiedUserValidator),
  createTweetValidator,
  wrapRequestHandler(createTweetController)
)

/**
 * Description: Get tweet detail
 * Path: /:tweet_id
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 */
tweetsRouter.get(
  '/:tweet_id',
  tweetIValidator,
  isUserLoggedValidator(accessTokenValidator),
  isUserLoggedValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetDetailController)
)

/**
 * Description: Get tweet children
 * Path: /:tweet_id/children
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 * Query: { limit:number, page:number, type:TweetType }
 */
tweetsRouter.get(
  '/:tweet_id/children',
  tweetIValidator,
  getTweetChildrenValidator,
  paginationValidator,
  isUserLoggedValidator(accessTokenValidator),
  isUserLoggedValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetChildrenController)
)

/**
 * Description: Get new feeds
 * Path: /new-feed
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { limit:number, page:number }
 */
tweetsRouter.get(
  '/',
  paginationValidator,
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(getNewFeedController)
)

export default tweetsRouter
