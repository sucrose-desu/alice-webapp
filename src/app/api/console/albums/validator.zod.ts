import { AlbumCategory, AlbumSource, AlbumStatus } from '@/constants'
import { z } from 'zod'

export const createAlbumValidator = z.object({
  name: z.string(),
  subName: z.string(),
  description: z.string().optional(),
  poster: z.string(),
  group: z.string().uuid(),
  category: z.nativeEnum(AlbumCategory).default(AlbumCategory.ANIME).optional(),
  status: z.nativeEnum(AlbumStatus).default(AlbumStatus.AIRING).optional(),
  source: z.nativeEnum(AlbumSource).default(AlbumSource.OTHER).optional(),
  studio: z.string().optional(),
  link: z.string().optional(),
  seasonNo: z.number().default(1).optional(),
  isActive: z.boolean().default(true).optional(),
  releaseAt: z.string().date()
})

export const updateAlbumValidator = createAlbumValidator.partial()
