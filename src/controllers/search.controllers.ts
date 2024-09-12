import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { SearchQuery } from '~/models/requests/Search.requests'
import searchServices from '~/services/search.services'

export const searchController = async (
  req: Request<ParamsDictionary, any, any, SearchQuery>,
  res: Response,
  next: NextFunction
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const user_id = req.decoded_authorization?.user_id as string
  const media_type = req.query.media_type
  const people_follow = req.query.people_follow
  const result = await searchServices.search({
    content: req.query.content,
    limit,
    page,
    user_id,
    media_type,
    people_follow
  })
  return res.json({
    message: TWEETS_MESSAGES.TWEET_SEARCH_SUCCESSFULLY,
    result: {
      newFeeds: result.newFeeds,
      limit,
      page,
      total_page: Math.ceil(result.total / limit)
    }
  })
}
