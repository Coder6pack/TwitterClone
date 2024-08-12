import { Router } from 'express'
import { serveImageController, serveVideoStreamController } from '~/controllers/medias.controller'

const staticsRouter = Router()

staticsRouter.get('/image/:name', serveImageController)
staticsRouter.get('/video-stream/:name', serveVideoStreamController)

export default staticsRouter
