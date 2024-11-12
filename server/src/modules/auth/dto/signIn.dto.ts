import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignInDTO {
  @ApiProperty({ example: 'johndoe@business.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.trim().toLocaleLowerCase())
  email: string

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  password: string
}
