import { ParamsDictionary } from 'express-serve-static-core'
export interface BookmarkReqBody {
  tweet_id: string
}

export interface UnBookmarkReqParams extends ParamsDictionary {
  tweet_id: string
}
export interface UnBookmarkIdReqParams extends ParamsDictionary {
  bookmark_id: string
}
