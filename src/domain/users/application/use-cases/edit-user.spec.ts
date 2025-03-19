import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { UserNotFoundError } from './errors/user-not-found-error'
import { EditUserUseCase } from './edit-user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryUserRepository: InMemoryUserRepository

let sut: EditUserUseCase

describe('Edit user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new EditUserUseCase(inMemoryUserRepository)

    const user = makeUser(
      {
        email: 'johndoe@example.com',
      },
      new UniqueEntityID('1'),
    )

    inMemoryUserRepository.create(user)
  })

  it('should be able to edit an user', async () => {
    const result = await sut.execute({
      id: '1',
      name: 'John Doe',
      email: 'updated-email@example.com',
      password: '123456',
      type: 'user',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value).toMatchObject({
      user: expect.objectContaining({
        email: 'updated-email@example.com',
      }),
    })
  })

  it('should not be able to edit an user if it does not exist', async () => {
    const result = await sut.execute({
      id: '2',
      name: 'John Doe',
      email: 'updated-email@example.com',
      password: '123456',
      type: 'user',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
