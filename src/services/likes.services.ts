import { config } from 'dotenv'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import Like from '~/models/schemas/Like.schema'
import { LIKE_MESSAGES } from '~/constants/messages'

config()

class LikeService {
  async likeTweet(user_id: string, tweet_id: string) {
    const result = await databaseService.likes.findOneAndUpdate(
      {
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweet_id)
      },
      {
        $setOnInsert: new Like({
          user_id: new ObjectId(user_id),
          tweet_id: new ObjectId(tweet_id)
        })
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )
    return result
  }
  async unLikeTweet(user_id: string, tweet_id: string) {
    await databaseService.likes.deleteOne({
      user_id: new ObjectId(user_id),
      tweet_id: new ObjectId(tweet_id)
    })
    return {
      message: LIKE_MESSAGES.UNLIKE_SUCCESSFULLY
    }
  }
}

const likesServices = new LikeService()
export default likesServices
