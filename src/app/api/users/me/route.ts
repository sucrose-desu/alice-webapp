import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'

import { useAuthGuard } from '@/helpers'
import { prismaService } from '@/services'
import { ApiResponse } from '@/services/catch'

export async function GET(request: NextRequest) {
  try {
    const auth = useAuthGuard(headers())
    const account = await prismaService.account.findUnique({
      where: { id: auth.sub, uid: auth.uid },
      include: {
        permissions: true
      }
    })

    if (account) return ApiResponse.json(account)

    return ApiResponse.catch(null)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
