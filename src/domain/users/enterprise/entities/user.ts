import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  name: string
  email: string
  password: string
  type: 'admin' | 'user'
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name

    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email

    this.touch()
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password

    this.touch()
  }

  get type() {
    return this.props.type
  }

  set type(type: 'admin' | 'user') {
    this.props.type = type

    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        type: props.type ?? 'user',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
