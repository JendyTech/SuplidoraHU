import {
  CreateUser,
  GetUsersByIdWithImagesResult,
  SaveImageUser,
  UpdateUser,
} from '@contracts/repositories/User.repo'
import { UserModel, UserPhotoModel } from '@database/user.db'
import { ErrorHash } from '@errors/hash'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { hashPassword } from '@shared/functions/hash'
import { mongoosePagination } from '@shared/functions/pagination'
import { IUser } from '@interfaces/User'
import { MODELS_NAMES } from '@config/constants'
import { Types, FilterQuery } from 'mongoose'

export class UserRepository {
  static async getUsers(pagination: PaginationDTO, user: IUser) {
    const filters: FilterQuery<IUser> = {}

    if (pagination.search) {
      filters.$or = [
        {
          firstName: { $regex: new RegExp(pagination.search, 'i') },
        },
        {
          lastName: { $regex: new RegExp(pagination.search, 'i') },
        },
        {
          email: { $regex: new RegExp(pagination.search, 'i') },
        },
      ]
    }

    return mongoosePagination({
      ...pagination,
      Model: UserModel,
      filter: {
        ...filters,
        _id: { $ne: user._id },
      },
      extract: {
        _id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        active: true,
      },
    })
  }

  static async findByEmail(email: string) {
    const result = await UserModel.findOne({
      email,
    })

    if (!result) {
      return null
    }

    return result.toObject()
  }

  static async getUsersById(id: string) {
    const result = await UserModel.findById(id)

    if (!result) {
      return null
    }

    return result.toObject()
  }

  static async getUsersByIdWithPhotos(
    id: string,
  ): Promise<null | GetUsersByIdWithImagesResult> {
    const [user = null] = await UserModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: MODELS_NAMES.USERS_IMAGES,
          as: 'photos',
          localField: '_id',
          foreignField: 'userId',
        },
      },
      {
        $limit: 1,
      },
    ])

    return user
  }

  static async findById(id: string) {
    const result = await UserModel.findById(id).select('-password')

    if (!result) {
      return null
    }

    return result.toObject()
  }

  static async create(data: CreateUser) {
    let passwordHash: string

    try {
      passwordHash = await hashPassword(data.password)
    } catch (error) {
      throw new ErrorHash(error.message)
    }

    const result = await UserModel.create({
      ...data,
      password: passwordHash,
    })

    return result.toObject()
  }

  static async deleteUser(id: string) {
    const result = await UserModel.findByIdAndDelete(id)

    if (!result) return null

    return result.toObject()
  }

  static async updateUser(id: string, updateUser: UpdateUser) {
    const result = await UserModel.findByIdAndUpdate(id, updateUser)

    if (!result) return null

    return result.toObject()
  }

  static async updatePassword(id: string, hashedPassword: string) {
    try {
      const result = await UserModel.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true },
      )

      if (!result) return null

      return result.toObject()
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error)
      throw new ErrorHash('No se pudo actualizar la contraseña.')
    }
  }

  static async addImage(image: SaveImageUser) {
    const result = new UserPhotoModel(image)

    await result.save()

    return result.toObject()
  }

  static async findImageById(id: string) {
    const image = await UserPhotoModel.findById(id)

    if (!image) return null

    return image.toObject()
  }

  static async deleteImage(id: string) {
    const deletedImage = await UserPhotoModel.findByIdAndDelete(id)

    if (!deletedImage) return null

    return deletedImage.toObject()
  }
}
