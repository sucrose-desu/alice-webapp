import { z } from 'zod'

export const paramValidator = z.object({ id: z.string().transform((value) => Number(value)) })

export const queryValidator = z.object({
  page: z
    .string()
    .optional()
    .transform((value) => Number(value) || 1),
  limit: z
    .string()
    .optional()
    .transform((value) => Number(value) || 10),
  search: z.string().optional()
})
