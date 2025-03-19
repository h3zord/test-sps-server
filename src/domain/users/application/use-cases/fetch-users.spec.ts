import { InMemoryUsersRepository } from 'test/repositories/in-memory-user-repository'
import { FetchUsersUseCase } from './fetch-users'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository

let sut: FetchUsersUseCase

describe('Fetch users', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new FetchUsersUseCase(inMemoryUsersRepository)

    const user1 = makeUser()
    const user2 = makeUser()
    const user3 = makeUser()

    inMemoryUsersRepository.items.push(user1)
    inMemoryUsersRepository.items.push(user2)
    inMemoryUsersRepository.items.push(user3)
  })

  it('should be able to fetch all users', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items).toHaveLength(3)
  })
})
