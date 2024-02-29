import { type NextRequest } from 'next/server'
import { fromUnixTime } from 'date-fns'

import { supabaseAuth } from '@/helpers/supabase'
import { signInValidator, type SignIn } from '@/helpers/validator.zod'
import { apiTryCatch } from '@/services/catch'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignIn
    await signInValidator.parseAsync(body)

    const { data, error } = await supabaseAuth.signInWithPassword({
      email: body.email,
      password: body.password
    })

    if (error) return apiTryCatch(error, error.status)
    if (data.session) {
      const { access_token, refresh_token, expires_at } = data.session

      return Response.json(
        { accessToken: access_token, refreshKey: refresh_token, expiresAt: fromUnixTime(expires_at!).toISOString() },
        { status: 200 }
      )
    }

    return Response.json({ statusCode: 422, message: 'Unknown an error occurred.' })
  } catch (error) {
    return apiTryCatch(error)
  }
}
