import USER from '@messages/User.json'
import GENERAL from '@messages/General.json'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '@repositories/User.repo'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { HttpStatus } from '@nestjs/common'
import { errorResponse, successResponse } from '@shared/functions/response'
import { IUser } from '@interfaces/User';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dto/user.dto'
import { uploadBase64 } from '@shared/functions/cloudinary'
import { validatePassword } from '@shared/helpers/password'
import { UpdateUser } from '@contracts/repositories/User.repo'

@Injectable()
export class UsersService {
    async getUsers(pagination: PaginationDTO, user: IUser) {
        try {
            const result = await UserRepository.getUsers(pagination, user)

            return successResponse({
                data: result,
                message: USER.USERS_FETCHED,
            })
        } catch (error) {
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            })
        }
    }

    async createUser(dto: CreateUserDto, user: IUser) {
        let found, photoUrl: string | null = null, publicId: string | null


        const passwordValidation = validatePassword({ password: dto.password })


        if (!passwordValidation.success) {
            return errorResponse({
                message: passwordValidation.message,
                status: HttpStatus.BAD_REQUEST
            })
        }


        try {
            found = await UserRepository.findByEmail(dto.email)
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        if (found) {
            return errorResponse({
                message: USER.EMAIL_IN_USE,
                status: HttpStatus.CONFLICT,
            })
        }

        if (dto.photo) {

            try {
                const result = await uploadBase64(dto.photo)

                photoUrl = result.secureUrl
                publicId = result.publicId

            } catch (error) {
                console.error(error)
                return errorResponse({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: USER.ERROR_UPLOAD_IMAGE,
                    error
                })
            }

        }

        try {
            const { photoPublicId, password, ...rest } = await UserRepository.create({
                ...dto,
                createdBy: user._id,
                photoId: publicId,
                photo: photoUrl
            })

            return successResponse({
                data: rest,
                message: USER.USER_CREATED,
            })
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            })
        }
    }

    async updateUser(dto: UpdateUserDto, id: string, user: IUser) {
        let foundUser

        if (id === user._id.toString()) {
            return errorResponse({
                message: USER.CANNOT_UPDATE_OWN_PROFILE, 
                status: HttpStatus.FORBIDDEN,
            });
        }

        try {
            foundUser = await UserRepository.findById(id)
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        if (!foundUser) {
            return errorResponse({
                message: USER.USER_NOT_FOUND,
                status: HttpStatus.NOT_FOUND,
            })
        }

        try {
            const userData = {
                ...dto,
                updatedBy: user._id,
                createdBy: user._id,
            }

            const updatedUser = await UserRepository.updateUser(
                id,
                userData,
            )

            if (!updatedUser) {
                return errorResponse({
                    message: GENERAL.ERROR_DATABASE_MESSAGE,
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                })
            }

            return successResponse({
                data: updatedUser,
                message: USER.USER_UPDATED,
            })
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            })
        }
    }

    async deleteUser(id: string, user: IUser) {

        if (id === user._id.toString()) {
            return errorResponse({
                message: USER.CANNOT_DELETE_OWN_PROFILE,
                status: HttpStatus.FORBIDDEN,
            });
        }

        let foundUser

        try {
            foundUser = await UserRepository.findById(id)

            if (!foundUser) {
                return errorResponse({
                    message: USER.USER_NOT_FOUND,
                    status: HttpStatus.NOT_FOUND,
                })
            }

            await UserRepository.deleteUser(id)

            return successResponse({
                message: USER.USER_DELETED,
            })
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }
    }
}
