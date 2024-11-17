import * as Contracts from '@contracts/repositories/User.repo'
import { UserModel } from '@database/user.db'
import { ErrorHash } from '@errors/hash'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { hashPassword } from '@shared/functions/hash'
import { mongoosePagination } from '@shared/functions/pagination'
import { IUser } from '@interfaces/User'
import { UpdateUser } from '@contracts/repositories/User.repo'

export class UserRepository {
  static async getUsers(pagination: PaginationDTO, user: IUser){
    return mongoosePagination({
      ...pagination,
      Model: UserModel,
      filter: {
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

  static async findById(id: string) {
    const result = await UserModel.findById(id).select('-password')

    if (!result) {
      return null
    }

    return result.toObject()
  }

  static async create(data: Contracts.CreateUser) {
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

  static async deleteUser(id: string){
    const result = await UserModel.findByIdAndDelete(id)

    if (!result) return null

    return result.toObject()
  }

  static async updateUser(id: string, updateUser: UpdateUser){
    const result = await UserModel.findByIdAndUpdate(id, updateUser)

    if (!result) return null

    return result.toObject()
  }
}
