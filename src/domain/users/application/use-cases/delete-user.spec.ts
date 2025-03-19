import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { UserNotFoundError } from './errors/user-not-found-error'
import { DeleteUserUseCase } from './delete-user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryUserRepository: InMemoryUserRepository

let sut: DeleteUserUseCase

describe('Delete user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new DeleteUserUseCase(inMemoryUserRepository)

    const user = makeUser({}, new UniqueEntityID('1'))

    inMemoryUserRepository.create(user)
  })

  it('should be able to delete an user', async () => {
    const result = await sut.execute({
      id: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an user if it does not exist', async () => {
    const result = await sut.execute({
      id: 'invalid-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
