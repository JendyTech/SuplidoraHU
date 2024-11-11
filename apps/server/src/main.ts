import '@/config/database'
import colors from 'colors'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'
import { swaggerSetup } from '@config/swagger'
import { parserSetup } from '@config/parser'
import { corsSetup } from '@config/cors'
import { loggerSetup } from '@config/logger'
import { validationsSetup } from '@config/validations'
import { PORT } from '@config/enviroments'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })
  swaggerSetup(app)
  parserSetup(app)
  corsSetup(app)
  loggerSetup(app)
  validationsSetup(app)

  await app.listen(PORT, () => {
    console.log(colors.yellow(`[APP]: listening in http://localhost:${PORT}`))
  })
}
bootstrap()
