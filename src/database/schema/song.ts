import { pgTable, serial, text, doublePrecision } from 'drizzle-orm/pg-core'
import z from 'zod'

export const table = pgTable('songs', {
  id: serial('id').primaryKey(),
  title: text('title'),
  artist: text('artist'),
  album: text('album'),
  duration: doublePrecision('duration').default(0)
})

export const validator = z.object({
  title: z.string().min(1),
  artist: z.string().min(1),
  album: z.string().min(1),
  duration: z.string().min(1),
  createAt: z.date().optional()
})

export default {
  table,
  validator
}
