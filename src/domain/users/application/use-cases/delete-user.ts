import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { UserNotFoundError } from './errors/user-not-found-error'

interface DeleteUserUseCaseRequest {
  id: string
}

type DeleteUserUseCaseResponse = Either<UserNotFoundError, null>

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      return left(new UserNotFoundError())
    }

    await this.userRepository.delete(user)

    return right(null)
  }
}
