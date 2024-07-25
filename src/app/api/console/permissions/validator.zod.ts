import { z } from 'zod'

export const paramValidator = z.object({ id: z.any().transform((value) => parseInt(value)) })

export const createPermissionValidator = z.object({
  key: z.string(),
  name: z.string().optional(),
  canCreate: z.boolean(),
  canRead: z.boolean(),
  canEdit: z.boolean(),
  canDelete: z.boolean()
})

export const updatePermissionValidator = createPermissionValidator.partial()
