import type { INestApplication } from '@nestjs/common'
import morgan from 'morgan'

export const loggerSetup = (app: INestApplication) => {
  app.use(morgan('dev'))
}
