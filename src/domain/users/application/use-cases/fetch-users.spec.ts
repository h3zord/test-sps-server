import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { FetchUsersUseCase } from './fetch-users'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUserRepository

let sut: FetchUsersUseCase

describe('Fetch users', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new FetchUsersUseCase(inMemoryUserRepository)

    const user1 = makeUser()
    const user2 = makeUser()
    const user3 = makeUser()

    inMemoryUserRepository.items.push(user1)
    inMemoryUserRepository.items.push(user2)
    inMemoryUserRepository.items.push(user3)
  })

  it('should be able to fetch all users', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(3)
  })
})
