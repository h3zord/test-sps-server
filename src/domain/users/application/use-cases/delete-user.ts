import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { UserNotFoundError } from './errors/user-not-found-error'

interface DeleteUserUseCaseRequest {
  email: string
}

type DeleteUserUseCaseResponse = Either<UserNotFoundError, null>

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new UserNotFoundError())
    }

    await this.userRepository.delete(user)

    return right(null)
  }
}
