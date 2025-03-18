import { InMemoryUsersRepository } from 'test/repositories/in-memory-user-repository'
import { RegisterUserUseCase } from './register-user'

let inMemoryUsersRepository: InMemoryUsersRepository

let sut: RegisterUserUseCase

describe('Register user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new RegisterUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      type: 'user',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items).toHaveLength(1)

    expect(result.value).toMatchObject({
      user: expect.objectContaining({
        name: 'John Doe',
      }),
    })

    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
  })
})
