import { IS_PUBLIC_KEY } from '@config/constants'
import { SetMetadata } from '@nestjs/common'

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true)
