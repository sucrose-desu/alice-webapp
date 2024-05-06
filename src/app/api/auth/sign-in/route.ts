import { type NextRequest } from 'next/server'
import { addDays } from 'date-fns'

import { signInValidator, type SignIn } from '@/helpers/validator.zod'
import { apiTryCatch } from '@/services/catch'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignIn
    await signInValidator.parseAsync(body)

    // if (error) return apiTryCatch(error, error.status)
    if (1) {
      return Response.json(
        {
          accessToken: 'access_token',
          refreshKey: 'refresh_token',
          expiresAt: addDays(Date.now(), 30).toISOString()
        } as XHRLogin,
        { status: 200 }
      )
    }

    return Response.json({ statusCode: 422, message: 'Unknown an error occurred.' })
  } catch (error) {
    return apiTryCatch(error)
  }
}
