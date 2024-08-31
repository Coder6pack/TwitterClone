import { config } from 'dotenv'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import Bookmark from '~/models/schemas/Bookmark.schema'
import { BOOKMARK_MESSAGES } from '~/constants/messages'

config()

class BookmarkService {
  async bookmarkTweet(user_id: string, tweet_id: string) {
    const result = await databaseService.bookmarks.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweet_id)
      },
      {
        $setOnInsert: new Bookmark({ user_id: new ObjectId(user_id), tweet_id: new ObjectId(tweet_id) })
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )
    return result
  }
  async unBookmarkTweet(user_id: string, tweet_id: string) {
    await databaseService.bookmarks.deleteOne({
      user_id: new ObjectId(user_id),
      tweet_id: new ObjectId(tweet_id)
    })
    return {
      message: BOOKMARK_MESSAGES.UNBOOKMARK_SUCCESSFULLY
    }
  }
  async unBookmarkTweetByBookmarkId(bookmark_id: string) {
    await databaseService.bookmarks.deleteOne({
      _id: new ObjectId(bookmark_id)
    })
    return {
      message: BOOKMARK_MESSAGES.UNBOOKMARK_SUCCESSFULLY
    }
  }
}

const bookmarksServices = new BookmarkService()
export default bookmarksServices
