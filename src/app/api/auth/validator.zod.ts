import { z } from 'zod'

export const signInValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  keepLoggedIn: z.boolean().optional()
})

export const signUpValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  displayName: z.string().optional()
})
