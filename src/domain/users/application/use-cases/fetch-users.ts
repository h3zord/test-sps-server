import { Either, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'

interface FetchUsersUseCaseRequest {
  page: number
  limit: number
}

type FetchUsersUseCaseResponse = Either<
  null,
  {
    users: User[]
  }
>

export class FetchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    limit,
    page,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.userRepository.fetchAll({
      page,
      limit,
    })

    return right({
      users,
    })
  }
}
