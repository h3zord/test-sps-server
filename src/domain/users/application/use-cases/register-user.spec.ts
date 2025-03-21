import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { RegisterUserUseCase } from './register-user'
import { makeUser } from 'test/factories/make-user'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUserRepository: InMemoryUserRepository

let sut: RegisterUserUseCase

describe('Register user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new RegisterUserUseCase(inMemoryUserRepository)
  })

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      type: 'user',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(1)

    expect(result.value).toMatchObject({
      user: expect.objectContaining({
        name: 'John Doe',
      }),
    })

    expect(result.value).toEqual({
      user: inMemoryUserRepository.items[0],
    })
  })

  it('should not be able to register an user with the same email', async () => {
    const email = 'same-email'

    const newUser = makeUser({
      email,
    })

    inMemoryUserRepository.create(newUser)

    const result = await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      type: 'user',
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(1)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
