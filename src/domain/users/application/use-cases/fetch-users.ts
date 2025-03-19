import { Either, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/user-repository'

type FetchUsersUseCaseResponse = Either<
  null,
  {
    users: User[]
  }
>

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.fetchAll()

    return right({
      users,
    })
  }
}
