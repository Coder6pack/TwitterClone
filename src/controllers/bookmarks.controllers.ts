import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BOOKMARK_MESSAGES } from '~/constants/messages'
import { BookmarkReqBody, UnBookmarkIdReqParams, UnBookmarkReqParams } from '~/models/requests/Bookmark.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import bookmarksServices from '~/services/bookmarks.services'

export const bookmarkController = async (req: Request<ParamsDictionary, any, BookmarkReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const result = await bookmarksServices.bookmarkTweet(user_id, tweet_id)
  return res.json({
    message: BOOKMARK_MESSAGES.BOOKMARK_SUCCESSFULLY,
    result
  })
}

export const unBookmarkController = async (req: Request<UnBookmarkReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.params
  const result = await bookmarksServices.unBookmarkTweet(user_id, tweet_id)
  return res.json(result)
}

export const unBookmarkByIdController = async (req: Request<UnBookmarkIdReqParams>, res: Response) => {
  const { bookmark_id } = req.params
  const result = await bookmarksServices.unBookmarkTweetByBookmarkId(bookmark_id)
  return res.json(result)
}
