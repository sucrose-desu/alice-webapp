import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

import { apiTryCatch } from '@/services/catch'
import { getAuthorize } from '@/helpers'

const db = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const payload = await getAuthorize(request.headers)
    if (!payload) {
      return apiTryCatch({ message: 'Unauthorized' }, 401)
    }

    const profile = await db.profile.findFirst({
      where: { uid: payload.uid }
    })

    return Response.json({ ...profile, email: payload.email })
  } catch (error) {
    return apiTryCatch(error)
  }
}
