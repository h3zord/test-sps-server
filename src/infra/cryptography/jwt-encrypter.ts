import jwt from 'jsonwebtoken'
import { Encrypter } from '@/domain/users/application/cryptography/encrypter'
import { env } from '../env'

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>) {
    return jwt.sign(payload, env.SECRET_KEY, {
      expiresIn: '7d',
    })
  }
}
