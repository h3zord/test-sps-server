import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../repositories/user-repository'
import { UserNotFoundError } from './errors/user-not-found-error'

interface DeleteUserUseCaseRequest {
  email: string
}

type DeleteUserUseCaseResponse = Either<UserNotFoundError, null>

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new UserNotFoundError())
    }

    await this.usersRepository.delete(email)

    return right(null)
  }
}
