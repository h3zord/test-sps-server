import { Either, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/user-repository'

type RegisterUserUseCaseResponse = Either<
  null,
  {
    users: User[]
  }
>

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<RegisterUserUseCaseResponse> {
    const users = await this.usersRepository.fetchAll()

    return right({
      users,
    })
  }
}
