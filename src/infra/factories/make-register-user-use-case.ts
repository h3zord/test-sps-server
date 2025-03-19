import { RegisterUserUseCase } from '@/domain/users/application/use-cases/register-user'
import { PrismaUserRepository } from '../database/prisma/repositories/prisma-user-repository'

export function makeRegisterUserUseCase() {
  const userRepository = new PrismaUserRepository()

  const registerUserUseCase = new RegisterUserUseCase(userRepository)

  return registerUserUseCase
}
