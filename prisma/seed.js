const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

const genres = require('./seeds/genres.json')

// prisma migrate dev --skip-seed
async function main() {
  // TODO:
  await db.genre.createMany({
    data: genres,
    skipDuplicates: true
  })

  console.log('Seeding done.')
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
