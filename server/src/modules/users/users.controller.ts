import { Controller, Query, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { PaginationDTO } from '@shared/dto/Pagination.dto';
import { UsersService } from '@modules/users/users.service';
import { IUser } from '@interfaces/User';
import { User } from '@shared/decorators/Session'
import { CreateUserDto } from '@modules/users/dto/user.dto';

@Controller('/api/users')
export class UsersController {
constructor(private readonly usersService: UsersService){}

    @Get('/')
    getUsers(@Query() dto: PaginationDTO, @User() user: IUser) {
        return this.usersService.getUsers(dto, user)
    }

    @Post('/')
    createUser(@Body() dto: CreateUserDto, @User() user: IUser) {
        return this.usersService.createUser(dto, user)
    }

    @Patch('/:id')
    updateUser(@Body() dto: CreateUserDto, @Param('id') id: string, @User() user: IUser) {
        return this.usersService.updateUser(dto, id, user)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string, @User() user: IUser) {
        return this.usersService.deleteUser(id, user)
    }
}
