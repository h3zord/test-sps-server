import { Either, left, right } from '@/core/either'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  type: 'admin' | 'user'
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
    type,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const user = User.create({
      name,
      email,
      password,
      type,
    })

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
