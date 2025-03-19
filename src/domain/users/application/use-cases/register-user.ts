import { Either, left, right } from '@/core/either'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/user-repository'

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
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    type,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const user = User.create({
      name,
      email,
      password,
      type,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
