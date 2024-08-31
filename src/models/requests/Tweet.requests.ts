import { TweetAudience, TweetType } from '~/constants/enum'
import { ParamsDictionary, Query } from 'express-serve-static-core'
import { Media } from '../Other'

export interface TweetReqBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string //  chỉ null khi tweet gốc, không thì là tweet_id cha dạng string
  hashtags: string[] // tên của hashtag dạng ['javascript', 'reactjs']
  mentions: string[] // user_id[]
  medias: Media[]
}

export interface TweetReqParams extends ParamsDictionary {
  tweet_id: string
}

export interface TweetReqQuery extends Pagination, Query {
  type: string
}

export interface Pagination {
  limit: string
  page: string
}
