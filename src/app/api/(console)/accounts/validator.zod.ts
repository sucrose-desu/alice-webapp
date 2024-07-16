import { Roles } from '@prisma/client'
import { z } from 'zod'

export const createAccountValidator = z.object({
  role: z.nativeEnum(Roles).optional().default(Roles.USER),
  email: z.string().email(),
  password: z.string().min(8).max(32),
  displayName: z.string().optional()
})

export const updateAccountValidator = z
  .object({
    role: z.nativeEnum(Roles),
    email: z.string().email(),
    password: z.string().min(8).max(32),
    displayName: z.string(),
    avatar: z
      .instanceof(File)
      .refine((file) => file?.type.includes('image'), 'File must be a IMAGE')
      .refine((file) => file?.size <= 1e6, 'File size must be less than 1MB')
  })
  .partial()
