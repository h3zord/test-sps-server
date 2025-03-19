import {
  PaginationParams,
  UserRepository,
} from '@/domain/users/application/repositories/user-repository'
import { User } from '@/domain/users/enterprise/entities/user'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async create(user: User) {
    this.items.push(user)
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async fetchAll({ page = 1, limit = 20 }: PaginationParams) {
    const start = (page - 1) * limit
    const end = start + limit

    return this.items.slice(start, end)
  }

  async save(user: User) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === user.id.toString(),
    )

    this.items[itemIndex] = user
  }

  async delete(user: User) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === user.id.toString(),
    )

    this.items.splice(itemIndex, 1)
  }
}
