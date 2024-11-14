import 'nestjs/swagger'

declare module '@nestjs/swagger' {
  interface SwaggerCustomOptions {
    swaggerOptions?: {
      persistAuthorization?: boolean
    }
  }
}