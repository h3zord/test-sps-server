import { GetUserByEmailUseCase } from '@/domain/users/application/use-cases/get-user-by-email'
import { PrismaUserRepository } from '../database/prisma/repositories/prisma-user-repository'

export function makeGetUserByEmailUseCase() {
  const userRepository = new PrismaUserRepository()

  const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository)

  return getUserByEmailUseCase
}
