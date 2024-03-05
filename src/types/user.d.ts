import { UserRole } from '@/constants'

interface User extends BaseDate {
  id: number
  uid: string
  role: UserRole
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
