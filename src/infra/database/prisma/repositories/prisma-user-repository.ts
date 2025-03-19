import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { User } from '@/domain/users/enterprise/entities/user'
import { prisma } from '../prisma'

export class PrismaUserRepository implements UserRepository {
  async create(data: User) {
    const prismaUser = PrismaUserMapper.toPrisma(data)

    await prisma.user.create({ data: prismaUser })
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async fetchAll() {
    const users = await prisma.user.findMany()

    return users.map(PrismaUserMapper.toDomain)
  }

  async save(data: User) {
    const prismaUser = PrismaUserMapper.toPrisma(data)

    await prisma.user.update({
      where: {
        id: prismaUser.id,
      },
      data: prismaUser,
    })
  }

  async delete(data: User) {
    const prismaUser = PrismaUserMapper.toPrisma(data)

    await prisma.user.delete({
      where: {
        id: prismaUser.id,
      },
    })
  }
}
