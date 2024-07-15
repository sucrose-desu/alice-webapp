import { PrismaClient } from '@prisma/client'

export const prismaService = new PrismaClient()

export { AuthService } from './modules/auth.service'
export { CommonService } from './modules/common.service'
