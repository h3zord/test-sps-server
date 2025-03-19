import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { GetUserByEmailUseCase } from './get-user-by-email'
import { UserNotFoundError } from './errors/user-not-found-error'

let inMemoryUserRepository: InMemoryUserRepository

let sut: GetUserByEmailUseCase

describe('Get user by email', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new GetUserByEmailUseCase(inMemoryUserRepository)

    const user = makeUser({
      email: 'johndoe@example.com',
    })

    inMemoryUserRepository.create(user)
  })

  it('should be able to get an user by email', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toMatchObject({
      user: expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    })
  })

  it('should not be able to get an user by email if it does not exist', async () => {
    const result = await sut.execute({
      email: 'invalid-email',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
