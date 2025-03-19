import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@spsgroup.com.br'

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'admin',
        email: adminEmail,
        password: '1234',
        type: 'admin',
      },
    })

    console.log('Usuário admin criado com sucesso!')
  } else {
    console.log('Usuário admin já existe.')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })
