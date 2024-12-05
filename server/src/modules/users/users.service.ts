import USER from '@messages/User.json'
import GENERAL from '@messages/General.json'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '@repositories/User.repo'
import { PaginationDTO } from '@shared/dto/Pagination.dto'
import { HttpStatus } from '@nestjs/common'
import { errorResponse, successResponse } from '@shared/functions/response'
import { IUser } from '@interfaces/User';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dto/user.dto'
import { deleteResource, uploadBase64 } from '@shared/functions/cloudinary'
import { validatePassword } from '@shared/helpers/password'
import { hashPassword } from '@shared/functions/hash'
import { CloudinaryResult } from '@contracts/Cloudinary'

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

    async getUserById(userId: string, photo: boolean = false) {
        let user

        try {
            user = await (photo ? UserRepository.getUsersByIdWithPhotos(userId) : UserRepository.findById(userId))
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        if (!user) {
            return errorResponse({
                message: USER.USER_NOT_FOUND,
                status: HttpStatus.NOT_FOUND,
            })
        }

        return successResponse({
            data: user,
            message: USER.USERS_FETCHED,
        })
    }

    async getProfile(user: IUser) {
        let foundUser

        try {
            foundUser = await UserRepository.findById(user._id.toString());

            if (!foundUser) {
                return errorResponse({
                    message: USER.USER_NOT_FOUND,
                    status: HttpStatus.NOT_FOUND,
                });
            }

            return successResponse({
                data: foundUser,
                message: USER.PROFILE_FETCHED,
            });
        } catch (error) {
            console.error(error);
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            });
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

            if (!foundUser) {
                return errorResponse({
                    message: USER.USER_NOT_FOUND,
                    status: HttpStatus.NOT_FOUND,
                })
            }
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        const { firstName, lastName, photo } = dto

        try {
            const updateUser = await UserRepository.updateUser(id,
            {
                firstName,
                lastName,
                photo,
                updatedBy: user._id
            })

            if (!updateUser) {
                return errorResponse({
                    message: GENERAL.ERROR_DATABASE_MESSAGE,
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                })
            }

            return successResponse({
                data: updateUser,
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

    async updatePassword(id: string, newPassword: string, user: IUser) {
        console.log('Inicio del método updatePassword');
        let foundUser;
    
        if (id === user._id.toString()) {
            console.warn('Estás cambiando tu propia contraseña');
        }
    
        try {
            console.log(`Buscando usuario con id: ${id}`);
            foundUser = await UserRepository.findById(id);
            
            if (!foundUser) {
                console.warn('Usuario no encontrado');
                return errorResponse({
                    message: USER.USER_NOT_FOUND,
                    status: HttpStatus.NOT_FOUND,
                });
            }
            console.log('Usuario encontrado:', foundUser);
        } catch (error) {
            console.error('Error al buscar el usuario:', error);
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    
        let hashedPassword: string;
        try {
            console.log(`Hasheando nueva contraseña para el usuario con id: ${id}`);
            hashedPassword = await hashPassword(newPassword);
            console.log('Contraseña hasheada correctamente');
        } catch (error) {
            console.error('Error al hashear la contraseña:', error);
            return errorResponse({
                message: USER.ERROR_HASH_PASSWORD,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    
        try {
            console.log(`Actualizando la contraseña para el usuario con id: ${id}`);
            const updatedUser = await UserRepository.updatePassword(id, hashedPassword);
            if (!updatedUser) {
                console.warn('No se pudo actualizar la contraseña en la base de datos');
                return errorResponse({
                    message: GENERAL.ERROR_DATABASE_MESSAGE,
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                });
            }
            console.log('Contraseña actualizada correctamente para el usuario:', updatedUser);
    
            return successResponse({
                message: USER.PASSWORD_UPDATED,
            });
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            });
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

    async uploadImage(userId: string, photo: string, user: IUser){
        let result: CloudinaryResult, resultImageDatabase

        try {
            const user = await UserRepository.findById(userId)

            if (!user) {
                return errorResponse({
                    message: USER.USER_NOT_FOUND,
                    status: HttpStatus.NOT_FOUND,
                })
            }
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        try {
            result = await uploadBase64(photo)
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        try {
            resultImageDatabase = await UserRepository.addImage({
                userId,
                publicId: result.publicId,
                url: result.secureUrl,
                uploadBy: user._id
            })
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        return successResponse({
            data: resultImageDatabase,
            message: USER.IMAGE_UPLOADED,
        })
    }

    async deleteImage(imageId: string) {
        let image

        try {
            image = await UserRepository.findImageById(imageId)

            if (!image) {
                return errorResponse({
                    message: USER.IMAGE_NOT_FOUND,
                    status: HttpStatus.NOT_FOUND,
                })
            }
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: GENERAL.ERROR_DATABASE_MESSAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        try {
            await deleteResource(image.publicId)
        } catch (error) {
            console.error(error)
            return errorResponse({
                message: USER.ERROR_DELETE_IMAGE,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error,
            })
        }

        try {
            const deleteImage = await UserRepository.deleteImage(imageId)

            return successResponse({
                data: deleteImage,
                message: USER.IMAGE_DELETED,
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
