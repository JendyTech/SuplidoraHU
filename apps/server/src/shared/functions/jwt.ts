import * as jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '@config/enviroments'
import { JWT_ALGORITHM, TOKEN_DESTINATION } from '@config/constants'

const { sign, verify } = jsonwebtoken

export const getPayload = (token: string) => {
  try {
    const [, payload] = token.split('.')
    return JSON.parse(atob(payload))
  } catch (_error) {
    throw new Error('Invalid token')
  }
}

export const isExpired = <T = any>(token: string | Record<string, any>) => {
  const payload = token instanceof Object ? token : getPayload(token)

  if (!payload.exp) {
    throw new Error('Invalid token')
  }

  const expirationDate = payload.exp
  const currentDate = new Date().getTime()

  return {
    payload: payload as T,
    expired: currentDate > expirationDate,
  }
}

export const verifyToken = (token: string) => {
  return verify(token, JWT_SECRET, {
    algorithms: [JWT_ALGORITHM],
  })
}

interface CreateTokenParams {
  time: number
  payload: Record<string, any>
  destination: keyof typeof TOKEN_DESTINATION
}

export const createToken = ({
  payload,
  time,
  destination,
}: CreateTokenParams) => {
  const thirtyDays = time ?? 30 * 24 * 60 * 60 * 1000
  const expirationDate = new Date().getTime() + thirtyDays
  const token = sign(payload ?? {}, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: expirationDate,
    subject: destination,
  })
  return token
}
