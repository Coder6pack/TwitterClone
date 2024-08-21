import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.schema'
import Tweet from '~/models/schemas/Tweet.schema'
import Hashtag from '~/models/schemas/Hashtag.schema'
import Bookmark from '~/models/schemas/Bookmark.schema'

config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.hv8vh3t.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`

// Tạo class để handle connect tới database
class DatabaseService {
  // Tạo thuộc tính
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error: ', error)
      throw error
    }
  }

  async indexUsers() {
    const exits = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1'])
    if (!exits) {
      this.users.createIndex({ email: 1, password: 1 })
      this.users.createIndex({ email: 1 }, { unique: true })
      this.users.createIndex({ username: 1 }, { unique: true })
    }
  }
  async indexRefreshToken() {
    const exits = await this.refresh_tokens.indexExists(['token_1', 'exp_1'])
    if (!exits) {
      this.refresh_tokens.createIndex({ token: 1 })
      this.refresh_tokens.createIndex({ exp: 1 }, { expireAfterSeconds: 0 })
    }
  }
  // indexVideoStatus(){
  //   this.indexVideoStatus.createIndex({name:1})
  // }

  async indexFollowers() {
    const exits = await this.followers.indexExists(['user_id_1_followed_user_id_1'])
    if (!exits) {
      this.followers.createIndex({ user_id: 1, followed_user_id: 1 })
    }
  }

  // Tạo phương thức getter lấy collection users
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USER_COLLECTION as string)
  }

  // Tạo phương thức getter lấy collection refresh_token
  get refresh_tokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }
  get followers(): Collection<Follower> {
    return this.db.collection(process.env.DB_FOLLOWERS_COLLECTION as string)
  }
  get tweets(): Collection<Tweet> {
    return this.db.collection(process.env.DB_TWEETS_COLLECTION as string)
  }
  get hashtags(): Collection<Hashtag> {
    return this.db.collection(process.env.DB_HASHTAGS_COLLECTION as string)
  }
  get bookmarks(): Collection<Bookmark> {
    return this.db.collection(process.env.DB_BOOKMARKS_COLLECTION as string)
  }
}

// Tạo object từ class DatabaseService

const databaseService = new DatabaseService()
export default databaseService
