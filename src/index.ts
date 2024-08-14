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

config()

// Tạo folder uploads nếu không có
initFolder()

//  Kết nối database
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshToken()
  databaseService.indexFollowers()
})
// Khởi tại server
const app = express()

// Khởi tạo port localhost
const port = process.env.PORT || 4000

app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/statics', staticsRouter)
app.use('/tweets', tweetsRouter)
app.use('/statics/video', express.static(UPLOAD_VIDEO_DIR))

// Handle Error mặc định của app
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
