import { PrismaUserRepository } from '../database/prisma/repositories/prisma-user-repository'
import { DeleteUserUseCase } from '@/domain/users/application/use-cases/delete-user'

export function makeDeleteUserUseCase() {
  const userRepository = new PrismaUserRepository()

  const deleteUserUseCase = new DeleteUserUseCase(userRepository)

  return deleteUserUseCase
}
