import * as cloudinary from 'cloudinary'
import type { CloudinaryResult } from '@contracts/Cloudinary'
import {
  ErrorUploadCloudinary,
  ErrorDeleteCloudinary,
} from '@errors/cloudinary'
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '@config/enviroments'

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

export const uploadBase64 = async (
  base64: string,
): Promise<CloudinaryResult> => {
  try {
    const { secure_url: secureUrl, public_id: publicId } =
      await cloudinary.v2.uploader.upload(base64)

    return {
      secureUrl,
      publicId,
    }
  } catch (error) {
    throw new ErrorUploadCloudinary(error)
  }
}

export const deleteResource = async (publicId: string) => {
  try {
    await cloudinary.v2.uploader.destroy(publicId)
  } catch (error) {
    throw new ErrorDeleteCloudinary(error)
  }
}

export const uploadMultipleBase64 = async (
  base64s: string[],
): Promise<CloudinaryResult[]> => {
  try {
    const promises = base64s.map((base64) => uploadBase64(base64))

    return await Promise.all(promises)
  } catch (error) {
    throw new ErrorUploadCloudinary(error)
  }
}

export const deleteMultipleResources = async (publicIds: string[]) => {
  try {
    await cloudinary.v2.api.delete_resources(publicIds)
  } catch (error) {
    throw new ErrorDeleteCloudinary(error)
  }
}
