import { type Account, type Permission } from '@prisma/client'
import { AccountRole } from '@/constants'

export interface JWTPayload {
  sub: string
  uid: string
  role: AccountRole
  permissions: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>[]
}

export interface User extends Omit<Account, 'password'> {
  permissions: Permission[]
}

export interface UserQuery extends BaseQuery {}
