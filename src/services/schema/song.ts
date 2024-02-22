import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const songs = pgTable('Songs', {
  id: serial('id').primaryKey(),
  title: text('title'),
  artist: text('artist'),
  album: text('album'),
  duration: text('duration')
})
