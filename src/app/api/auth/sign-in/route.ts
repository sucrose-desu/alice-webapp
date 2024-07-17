import { type NextRequest } from 'next/server'
import bcrypt from 'bcrypt'

import { ApiResponse, prismaService } from '@/services/server'
import { signAuthToken } from '@/services/server/auth'

import { signInValidator } from '../validator.zod'

export async function POST(request: NextRequest) {
  try {
    const body = await signInValidator.parseAsync(await request.json())
    const account = await prismaService.account.findFirst({
      where: { email: body.email },
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    })

    if (account) {
      if (!account.isActive) {
        return ApiResponse.message('Your account has been suspended.', 423)
      }

      const match = bcrypt.compareSync(body.password, account.password)
      if (!match) {
        return ApiResponse.message('Your password is incorrect.', 400)
      }

      const results = await signAuthToken(account)
      return ApiResponse.json(results)
    }

    return ApiResponse.message('The account not found.', 404)
  } catch (error) {
    return ApiResponse.catch(error)
  }
}
