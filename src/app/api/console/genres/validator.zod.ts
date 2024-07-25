import { GenreGroup } from '@/constants'
import { z } from 'zod'

export const paramValidator = z.object({ id: z.any().transform((value) => parseInt(value)) })

export const createGenreValidator = z.object({
  group: z.nativeEnum(GenreGroup).default(GenreGroup.GENERAL).optional(),
  text: z.string()
})

export const updateGenreValidator = z
  .object({
    group: z.nativeEnum(GenreGroup),
    text: z.string()
  })
  .partial()
