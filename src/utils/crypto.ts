import { createHash } from 'crypto'
import { config } from 'dotenv'

config()
export function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

export function hashPassword(password: string) {
  return sha256(password + process.env.HASH_PASSWORD)
}
