import { User } from '../../enterprise/entities/user'

export interface UsersRepository {
  create(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  fetchAll(): Promise<User[]>
}
