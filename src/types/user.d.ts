import { Permission, Roles } from '@prisma/client'

export interface JWTPayload {
  sub: string
  uid: string
  role: Roles
  email: string
  permissions: Omit<Permission, 'name' | 'createdAt' | 'updatedAt'>[]
}

export interface User extends BaseDate {
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

export interface UserQuery extends BaseQuery {}
