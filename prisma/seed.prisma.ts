import { PrismaClient } from '@prisma/client'

import accounts from './seeds/accounts'
import genres from './seeds/genres'
import permissions from './seeds/permissions'

const prisma = new PrismaClient()

async function fns() {
  console.log('[PrismaClient] Database seeding initialized.')

  // Seeding `Accounts`
  await prisma.account.createMany({
    data: accounts,
    skipDuplicates: true
  })
  console.log('[PrismaClient] Accounts data seeding success, ✅')

  // Seeding `Permissions`
  await prisma.permission.createMany({
    data: permissions,
    skipDuplicates: true
  })
  console.log('[PrismaClient] Permissions data seeding success, ✅')

  // Seeding `Genres`
  await prisma.genre.createMany({
    data: genres,
    skipDuplicates: true
  })
  console.log('[PrismaClient] Genres data seeding success, ✅')

  console.log('[PrismaClient] The seed has been successfully created, 🎉')
}

fns()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
