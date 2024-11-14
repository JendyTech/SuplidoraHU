import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { APP_NAME, APP_SWAGGER_URL } from '@config/constants'
import { NODE_ENV } from '@config/enviroments'

const swaggerConfig = new DocumentBuilder()
  .addBearerAuth()
  .setTitle(APP_NAME)
  .setDescription(`The web services for the project ${APP_NAME}`)
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
    name: 'Authorization',
    description: 'Enter your JWT token',
  })
  .addSecurityRequirements('bearer')
  .build()

export const swaggerSetup = (app: INestApplication) => {
  if (NODE_ENV === 'DEVELOPMENT') {
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup(APP_SWAGGER_URL, app, document, {
      swaggerOptions: {
        persistAuthorization: NODE_ENV === 'DEVELOPMENT'
      }
    })
  }
}
