import { type NextRequest } from 'next/server'

import { UserRole } from '@/constants'
import { apiTryCatch } from '@/services/catch'

export async function GET(request: NextRequest) {
  try {
    const user = {
      id: 1,
      role: UserRole.GUEST,
      avatar: 'https://i.pravatar.cc/320',
      displayName: 'display name',
      username: 'app.ts',
      email: 'app.ts@alice.live',
      isVerified: false,
      isActive: true
    }

    return Response.json(user)
  } catch (error) {
    return apiTryCatch(error)
  }
}
