import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { getNameFormFullName, handleUploadImage, handleUploadVideo } from '~/utils/file'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { MediaType } from '~/constants/enum'
import { Media } from '~/models/Other'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { config } from 'dotenv'

config()

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFormFullName(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        sharp.cache(false)
        await sharp(file.filepath).jpeg().toFile(newPath)
        fs.unlinkSync(path.resolve(file.filepath))
        return {
          url: isProduction
            ? `${process.env.HOST}/statics/image/${newName}.jpg`
            : `http://localhost:${process.env.PORT}/statics/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }
  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const result = files.map((file) => {
      return {
        url: isProduction
          ? `${process.env.HOST}/statics/video/${file.newFilename}`
          : `http://localhost:${process.env.PORT}/statics/video/${file.newFilename}`,
        type: MediaType.Video
      }
    })
    return result
  }
}

const mediasService = new MediasService()
export default mediasService
