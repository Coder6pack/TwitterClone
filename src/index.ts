import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.midleware'

//  Kết nối database
databaseService.connect()

// Khởi tại server
const app = express()

// Khởi tạo port localhost
const port = 4000

app.use(express.json())
app.use('/users', usersRouter)

// Handle Error mặc định của app
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
