import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'
import { imageBase64 } from '@shared/data/imageBase64'

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'First name of the user' })
    @IsString({ message: 'El nombre debe ser un string' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @Transform(({ value }: { value: string }) => value.trim())
    firstName: string

    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    @IsString({ message: 'El apellido debe ser un string' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacio' })
    @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    @Transform(({ value }: { value: string }) => value.trim())
    lastName: string

    @ApiProperty({ example: 'password123', description: 'Password of the user' })
    @IsString({ message: 'La contraseña debe ser un string' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacia' })
    @MinLength(8, { message: 'El apellido debe tener al menos 8 caracteres' })
    @Transform(({ value }: { value: string }) => value.trim())
    password: string

    @ApiProperty({ example: 'johndoe@gmail.com', description: 'Email of the user' })
    @IsString({ message: 'El email debe ser un string' })
    @IsNotEmpty({ message: 'El email no puede estar vacio' })
    @Transform(({ value }: { value: string }) => value.trim())
    email: string

    @ApiProperty({ example: imageBase64, description: 'Photo of the user' })
    @IsString({ message: 'La foto debe ser un string' })
    @IsOptional({ message: 'La foto es opcional' })
    photo: string
}

export class UpdateUserDto {
    @ApiProperty({ example: 'John', description: 'First name of the user' })
    @IsString({ message: 'El nombre debe ser un string' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    @Transform(({ value }: { value: string }) => value.trim())
    firstName: string

    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    @IsString({ message: 'El apellido debe ser un string' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacio' })
    @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
    @Transform(({ value }: { value: string }) => value.trim())
    lastName: string

    @ApiProperty({ example: imageBase64, description: 'Photo of the user' })
    @IsString({ message: 'La foto debe ser un string' })
    @IsOptional({ message: 'La foto es opcional' })
    photo: string

    @ApiProperty({ example: 'password123', description: 'Password of the user' })
    @IsString({ message: 'La contraseña debe ser un string' })
    @IsNotEmpty({ message: 'La contraseña no puede estar vacia' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @Transform(({ value }: { value: string }) => value.trim())
    password: string
}