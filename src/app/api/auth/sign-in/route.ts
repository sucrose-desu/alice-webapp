import { type NextRequest } from 'next/server'
import bcrypt from 'bcrypt'

import { createAccessToken } from '@/helpers'
import { signInValidator } from '@/helpers/validator.zod'
import { prismaService } from '@/services'
import { ApiResponse } from '@/services/catch'

export async function POST(request: NextRequest) {
  try {
    const body = await signInValidator.parseAsync(await request.json())
    const account = await prismaService.account.findFirst({
      where: { email: body.email }
    })

    if (account) {
      if (!account.isActive) {
        return ApiResponse.message('Your account has been suspended.', 423)
      }

      const match = bcrypt.compareSync(body.password, account.password)
      if (!match) {
        return ApiResponse.message('Your password is incorrect.', 400)
      }

      const results = await createAccessToken(account)
      return ApiResponse.json(results)
    }

    return ApiResponse.message('The account not found.', 404)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
