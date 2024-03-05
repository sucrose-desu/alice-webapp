import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

import { APP_USER_INFO } from '@/constants/configs'
import { getAuthorize } from '@/helpers'
import { apiTryCatch } from '@/services/catch'
import { Hexadecimal } from '@/utils'

const db = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const payload = await getAuthorize(request.headers)
    if (!payload) {
      return apiTryCatch(new Error('Unauthorized'), 401)
    }

    const profile = await db.profile.findFirst({
      where: { uid: payload.uid }
    })

    if (profile) {
      const userProfile = {
        email: payload.email,
        ...profile
      }

      return Response.json(userProfile, {
        headers: {
          'Set-Cookie': `${APP_USER_INFO}=${Hexadecimal.encode(JSON.stringify(userProfile))}`
        }
      })
    }

    return Response.json({ statusCode: 422, message: 'Unknown an error occurred.' })
  } catch (error) {
    return apiTryCatch(error)
  }
}
