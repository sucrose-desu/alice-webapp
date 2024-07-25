import { z } from 'zod'

export const queryValidator = z.object({
  path: z.string(),
  poster: z.string().optional()
})
