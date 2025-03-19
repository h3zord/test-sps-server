import { InMemoryUsersRepository } from 'test/repositories/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeUser } from 'test/factories/make-user'
import { WrongCredentialsError } from './errors/wrong-credentials'

let authenticateUseCase: AuthenticateUseCase

let userRepository: InMemoryUsersRepository
let fakeEncrypter: FakeEncrypter

describe('Authenticate use case', () => {
  userRepository = new InMemoryUsersRepository()
  fakeEncrypter = new FakeEncrypter()

  authenticateUseCase = new AuthenticateUseCase(userRepository, fakeEncrypter)

  beforeAll(async () => {
    const admin = makeUser({
      email: 'johndoe@example.com',
      password: '123456',
    })

    userRepository.create(admin)
  })

  it('should be able to authenticate an user', async () => {
    const result = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate an user when the email is incorrect', async () => {
    const result = await authenticateUseCase.execute({
      email: 'invalid-email',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate an user when the password is incorrect', async () => {
    const result = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: 'invalid-password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
