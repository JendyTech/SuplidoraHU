import path from 'node:path'

export const APP_SIZE_LIMIT_UPLOAD = '10mb'
export const APP_NAME = 'Suplidora HU Services'
export const APP_SWAGGER_URL = '/'
export const ROOT_DIR = path.resolve(__dirname, '..', '..')
export const IS_PUBLIC_KEY = 'isPublicRoute'
export const JWT_ALGORITHM = 'HS256'
export const TOKEN_DESTINATION = {
  AUTH: 'AUTH',
  VERIFICATION: 'VERIFICATION',
} as const

export const MODELS_NAMES = {
  USERS: 'users',
}
export const SESSION_TOKEN_TIME = 30 * 24 * 60 * 60 * 1000 // 30 days
