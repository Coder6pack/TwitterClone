import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import staticsRouter from './routes/statics.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import searchRouter from './routes/search.routes'
import { createServer } from 'http'
import { Server } from 'socket.io'
// import '~/utils/fake'

config()

// Tạo folder uploads nếu không có
initFolder()

//  Kết nối database
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshToken()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})
// Khởi tại server
const app = express()
const httpServer = createServer(app)

// Khởi tạo port localhost
const port = process.env.PORT || 4000

app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/statics', staticsRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/likes', likesRouter)
app.use('/search', searchRouter)
app.use('/statics/video', express.static(UPLOAD_VIDEO_DIR))

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`)
  })
})

// Handle Error mặc định của app
app.use(defaultErrorHandler)
httpServer.listen(port, () => {
  console.log(`listening on port ${port}`)
})
