import { PrismaClient } from '@prisma/client'
import genres from './seeds/genres'

const prisma = new PrismaClient()

async function fns() {
  console.log('[PrismaClient] Database seeding initialized.')

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
