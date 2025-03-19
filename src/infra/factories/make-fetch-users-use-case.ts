import { PrismaUserRepository } from '../database/prisma/repositories/prisma-user-repository'
import { FetchUsersUseCase } from '@/domain/users/application/use-cases/fetch-users'

export function makeFetchUserUseCase() {
  const userRepository = new PrismaUserRepository()

  const fetchUsersUseCase = new FetchUsersUseCase(userRepository)

  return fetchUsersUseCase
}
