import { headers } from 'next/headers'
import { type NextRequest } from 'next/server'

import { prismaService } from '@/libs/prisma'
import { ApiResponse } from '@/services/server'
import { signAuthToken, useAuthGuard } from '@/services/server/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const auth = useAuthGuard(headers())
    const account = await prismaService.account.findUnique({
      where: { id: auth.sub, uid: auth.uid },
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    })

    if (account) {
      const results = await signAuthToken(account)
      return ApiResponse.json(results)
    }

    return ApiResponse.catch(null)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
