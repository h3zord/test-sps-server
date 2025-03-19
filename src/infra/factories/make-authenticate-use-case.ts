import { AuthenticateUseCase } from '@/domain/users/application/use-cases/authenticate'
import { PrismaUserRepository } from '../database/prisma/repositories/prisma-user-repository'
import { JwtEncrypter } from '../cryptography/jwt-encrypter'

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUserRepository()
  const encrypter = new JwtEncrypter()

  const authenticateUseCase = new AuthenticateUseCase(userRepository, encrypter)

  return authenticateUseCase
}
