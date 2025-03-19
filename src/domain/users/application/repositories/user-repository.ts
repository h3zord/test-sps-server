import { User } from '../../enterprise/entities/user'

export interface PaginationParams {
  page: number
  limit: number
}

export interface UserRepository {
  create(user: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  fetchAll({ page }: PaginationParams): Promise<User[]>
  save(user: User): Promise<void>
  delete(user: User): Promise<void>
}
