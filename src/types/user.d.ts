import { UserRole } from '@/constants'

interface User extends BaseDate {
  id: number
  role: UserRole
  avatar: string
  displayName: string
  username: string
  email: string
  bio?: string
  isVerified?: boolean
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

interface UserQuery extends BaseQuery {}
