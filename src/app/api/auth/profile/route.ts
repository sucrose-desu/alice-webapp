import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'

import { ApiResponse, prismaService } from '@/services/server'
import { useAuthGuard } from '@/services/server/auth'
import { omit } from '@/utils'

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
      return ApiResponse.json({
        ...omit(account, ['password']),
        permissions: account.permissions.map(({ permission }) => permission)
      })
    }

    return ApiResponse.catch(null)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
