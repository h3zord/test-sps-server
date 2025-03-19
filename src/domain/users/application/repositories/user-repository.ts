import { User } from '../../enterprise/entities/user'

export interface UsersRepository {
  create(user: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  fetchAll(): Promise<User[]>
  save(user: User): Promise<void>
}
