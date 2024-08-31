import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { body } from 'express-validator'
import { TweetType } from '~/constants/enum'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { Pagination, TweetReqBody, TweetReqParams, TweetReqQuery } from '~/models/requests/Tweet.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (
  req: Request<ParamsDictionary, any, TweetReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const body = req.body
  const result = await tweetsService.createTweet(user_id, body)
  return res.json({
    message: 'create tweet successfully',
    result
  })
}

export const getTweetDetailController = async (req: Request<TweetReqParams>, res: Response, next: NextFunction) => {
  const { tweet_id } = req.params
  const user_id = req.decoded_authorization?.user_id
  const result = await tweetsService.increaseView(tweet_id, user_id)
  const tweet = {
    ...req.tweet,
    user_views: result.user_views,
    guest_views: result.guest_views,
    updated_at: result.updated_at
  }
  return res.json({
    message: 'Get tweet successfully',
    result: tweet
  })
}

export const getTweetChildrenController = async (
  req: Request<TweetReqParams, any, any, TweetReqQuery>,
  res: Response,
  next: NextFunction
) => {
  const type = Number(req.query.type) as TweetType
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const user_id = req.decoded_authorization?.user_id
  const { total, tweets } = await tweetsService.getTweetChildren({
    tweet_id: req.params.tweet_id,
    type,
    limit,
    page,
    user_id
  })
  return res.json({
    message: 'Get tweet children successfully',
    result: {
      tweets,
      type,
      limit,
      page,
      total_page: Math.ceil(total / limit)
    }
  })
}

export const getNewFeedController = async (
  req: Request<ParamsDictionary, any, any, Pagination>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const result = await tweetsService.getNewFeeds({ user_id, limit, page })
  return res.json({
    message: 'get new feed successfully',
    result: {
      newFeeds: result.newFeeds,
      limit,
      page,
      total_page: Math.ceil(result.total / limit)
    }
  })
}
