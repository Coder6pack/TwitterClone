import { Router } from 'express'
import { bookmarkController } from '~/controllers/bookmarks.controllers'
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

bookmarksRouter.post('', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(bookmarkController))

export default bookmarksRouter
