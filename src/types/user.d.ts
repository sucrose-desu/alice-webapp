import { Roles } from '@prisma/client'

interface User extends BaseDate {
  id: number
  uid: string
  role: Roles
  avatar: string
  displayName: string
  email: string
  bio?: string
  isVerified?: boolean
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

interface UserQuery extends BaseQuery {}
