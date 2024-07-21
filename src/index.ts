import express, { Request, Response, NextFunction } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { dir } from 'console'

const app = express()
const port = 4000

app.use(express.json())
app.use('/users', usersRouter)

databaseService.connect()
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Loi la: ', err)
  res.status(400).json({
    error: err.message
  })
})
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
