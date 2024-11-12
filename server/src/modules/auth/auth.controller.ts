import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from '@/modules/auth/auth.service'
import { SignInDTO } from '@/modules/auth/dto/signIn.dto'
import { IsPublic } from '@shared/decorators/isPublic'

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @IsPublic()
  async signInUser(@Body() data: SignInDTO) {
    return this.authService.signIn(data)
  }
}
