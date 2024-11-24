import { Controller, Query, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaginationDTO } from '@shared/dto/Pagination.dto';
import { UsersService } from '@modules/users/users.service';
import { IUser } from '@interfaces/User';
import { User } from '@shared/decorators/Session'
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto, UploadUserImageDto } from '@modules/users/dto/user.dto';

@Controller('/api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('/')
    getUsers(@Query() dto: PaginationDTO, @User() user: IUser) {
        return this.usersService.getUsers(dto, user)
    }

    @Get('/profile')
    getProfile(@User() user: IUser) {
        return this.usersService.getProfile(user)
    }

    @Get('/:id')
    getUserById(@Param('id') id: string, @Query('photos') photos: boolean = false) { 
        return this.usersService.getUserById(id, String(photos) === 'true')
    }

    @Post('/')
    createUser(@Body() dto: CreateUserDto, @User() user: IUser) {
        return this.usersService.createUser(dto, user)
    }


    @Patch('/:id')
    updateUser(@Body() dto: UpdateUserDto, @Param('id') id: string, @User() user: IUser) {
        return this.usersService.updateUser(dto, id, user)
    }

    @Patch('/:id/password')
    updatePassword(
        @Param('id') id: string,
        @Body() dto: UpdatePasswordDto,
        @User() user: IUser) {
        return this.usersService.updatePassword(id, dto.newPassword, user);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string, @User() user: IUser) {
        return this.usersService.deleteUser(id, user)
    }

    @Delete('/delete-image/:id')
    deleteUserImage(@Param('id') id: string) {
        return this.usersService.deleteImage(id)
    }

    @Post('/:id/upload-image')
    uploadUserImage(@Body() dto: UploadUserImageDto, @User() user: IUser, @Param('id') id: string) {
        return this.usersService.uploadImage(id, dto.photo, user)
    }
}
