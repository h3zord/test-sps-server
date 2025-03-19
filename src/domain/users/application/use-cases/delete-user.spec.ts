import { InMemoryUsersRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { UserNotFoundError } from './errors/user-not-found'
import { DeleteUserUseCase } from './delete-user'

let inMemoryUsersRepository: InMemoryUsersRepository

let sut: DeleteUserUseCase

describe('Delete email', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new DeleteUserUseCase(inMemoryUsersRepository)

    const user = makeUser({
      email: 'johndoe@example.com',
    })

    inMemoryUsersRepository.create(user)
  })

  it('should be able to delte an user', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an user if it does not exist', async () => {
    const result = await sut.execute({
      email: 'invalid-email',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
