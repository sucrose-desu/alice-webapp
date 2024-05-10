import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createSecretKey } from 'crypto'
import { addDays } from 'date-fns'
import { SignJWT } from 'jose'
import { v5 as uuidV5, NIL } from 'uuid'
import bcrypt from 'bcrypt'

import { configs, ThrowErrs } from '@/constants'
import { signInValidator, type SignIn } from '@/helpers/validator.zod'
import { apiTryCatch } from '@/services/catch'

const prismaService = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SignIn
    await signInValidator.parseAsync(body)

    const account = await prismaService.account.findFirst({
      where: {
        email: body.email,
        isActive: true
      }
    })

    if (account) {
      const match = bcrypt.compareSync(body.password, account.password)

      if (!match) {
        return Response.json({ statusCode: 422, message: ThrowErrs.AUTH_FAILED })
      }

      const secretKey = createSecretKey(process.env.NEXT_PUBLIC_JWT_SECRET!, 'utf-8')
      const jwt = new SignJWT({
        sub: account.id,
        uid: account.uid,
        role: account.role,
        email: account.email,
        provider: account.provider
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(configs.APP_NAME)
        .setExpirationTime(process.env.NEXT_PUBLIC_JWT_TTL || '1 day')

      const accessToken = await jwt.sign(secretKey)
      const refreshKey = uuidV5(`${configs.APP_NAME}//${account.id}:${account.uid}`, NIL)

      return Response.json(
        {
          accessToken,
          refreshKey,
          expiresAt: addDays(Date.now(), 30).toISOString()
        } as XHRLogin,
        { status: 200 }
      )
    }

    return Response.json({ statusCode: 422, message: ThrowErrs.ACCOUNT_404 })
  } catch (error) {
    return apiTryCatch(error)
  }
}
