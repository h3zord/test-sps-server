import { Either, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'

type FetchUsersUseCaseResponse = Either<
  null,
  {
    users: User[]
  }
>

export class FetchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<FetchUsersUseCaseResponse> {
    const users = await this.userRepository.fetchAll()

    return right({
      users,
    })
  }
}
