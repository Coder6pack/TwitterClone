import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { dir } from 'console'

const app = express()
const port = 4000

app.use(express.json())

app.use('/users', usersRouter)
databaseService.connect().catch(console.dir)
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
