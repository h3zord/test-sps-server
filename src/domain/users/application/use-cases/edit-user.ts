import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { UserNotFoundError } from './errors/user-not-found-error'

interface EditUserUseCaseRequest {
  id: string
  name: string
  email: string
  password: string
  type: 'admin' | 'user'
}

type EditUserUseCaseResponse = Either<
  UserNotFoundError,
  {
    user: User
  }
>

export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    type,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      return left(new UserNotFoundError())
    }

    user.name = name
    user.email = email
    user.password = password
    user.type = type

    await this.userRepository.save(user)

    return right({
      user,
    })
  }
}
