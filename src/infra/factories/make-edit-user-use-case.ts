import { PrismaUserRepository } from '../database/prisma/repositories/prisma-user-repository'
import { EditUserUseCase } from '@/domain/users/application/use-cases/edit-user'

export function makeEditUserUseCase() {
  const userRepository = new PrismaUserRepository()

  const editUserUseCase = new EditUserUseCase(userRepository)

  return editUserUseCase
}
