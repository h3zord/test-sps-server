import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { UserNotFoundError } from './errors/user-not-found-error'

interface GetUserByEmailUseCaseRequest {
  email: string
}

type GetUserByEmailUseCaseResponse = Either<
  UserNotFoundError,
  {
    user: User
  }
>

export class GetUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new UserNotFoundError())
    }

    return right({
      user,
    })
  }
}
