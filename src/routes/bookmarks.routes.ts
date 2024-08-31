import { Router } from 'express'
import { bookmarkController, unBookmarkController, unBookmarkByIdController } from '~/controllers/bookmarks.controllers'
import { tweetIValidator } from '~/middlewares/tweets.middlewarves'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const bookmarksRouter = Router()

/**
 * Description: Create bookmark tweet
 * Path: /
 * Method: POST
 * Header: { Authorization: access_token:string  }
 * Body: { user_id:string, tweet_id:string }
 */

bookmarksRouter.post(
  '',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIValidator,
  wrapRequestHandler(bookmarkController)
)

/**
 * Description: unBookmark tweet by tweet_id
 * Path: /tweets/:tweet_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIValidator,
  wrapRequestHandler(unBookmarkController)
)

/**
 * Description: unBookmark tweet by bookmark_id
 * Path: /:bookmark_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

bookmarksRouter.delete(
  '/:bookmark_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIValidator,
  wrapRequestHandler(unBookmarkByIdController)
)
export default bookmarksRouter
