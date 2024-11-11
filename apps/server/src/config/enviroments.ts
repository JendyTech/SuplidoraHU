export const NODE_ENV = String(process.env.NODE_ENV ?? 'PRODUCTION') as
  | 'PRODUCTION'
  | 'DEVELOPMENT'

if (NODE_ENV === 'DEVELOPMENT') {
  process.loadEnvFile()
}

export const PORT = Number(process.env.PORT ?? 4000)
export const MONGO_URI = String(
  process.env.MONGO_URI ?? 'mongodb://localhost:27017/suplidora-hu',
)
export const JWT_SECRET = String(process.env.JWT_SECRET)
export const CLOUDINARY_CLOUD_NAME = String(process.env.CLOUDINARY_CLOUD_NAME)
export const CLOUDINARY_API_KEY = String(process.env.CLOUDINARY_API_KEY)
export const CLOUDINARY_API_SECRET = String(process.env.CLOUDINARY_API_SECRET)
