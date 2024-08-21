import { config } from 'dotenv'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import Bookmark from '~/models/schemas/Bookmark.schema'

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
}

const bookmarksServices = new BookmarkService()
export default bookmarksServices
