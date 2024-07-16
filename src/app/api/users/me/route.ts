import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'

import { ApiResponse, prismaService } from '@/services/server'
import { useAuthGuard } from '@/services/server/auth'

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
