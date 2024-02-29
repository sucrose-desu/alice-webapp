import { z } from 'zod'
import { UserRole } from '@/constants'

export const signInValidator = z.object({
  email: z.string().email(),
  password: z.string()
})

export type SignIn = z.infer<typeof signInValidator>

export const createUserValidator = z.object({
  role: z.nativeEnum(UserRole).optional(),
  email: z.string().email(),
  password: z.string(),
  displayName: z.string().optional(),
  avatar: z.string().optional()
})

export type CreateUser = z.infer<typeof createUserValidator>
