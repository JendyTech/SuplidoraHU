import * as Contracts from '@contracts/repositories/User.repo'
import { UserModel } from '@database/user.db'
import { ErrorHash } from '@errors/hash'
import { hashPassword } from '@shared/functions/hash'

export class UserRepository {
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
    const result = await UserModel.findById(id)

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
}
