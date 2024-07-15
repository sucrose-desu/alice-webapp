import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { type Account } from '@prisma/client'
import { createSecretKey } from 'crypto'
import { addYears } from 'date-fns'
import { decodeJwt, SignJWT } from 'jose'
import { v5 as uuidV5, NIL } from 'uuid'

import { APP_NAME } from '@/constants/configs'
import { prismaService } from '@/services'
import { omit } from '@/utils'
import type { JWTPayload } from '@/types/user'

export function useAuthGuard(headers: ReadonlyHeaders) {
  const bearerToken = headers.get('Authorization')

  if (bearerToken) {
    const accessToken = bearerToken.replace('Bearer', '').trim()
    return decodeJwt(accessToken) as JWTPayload
  }

  throw new Response(null, { status: 401, statusText: 'Unauthorized' })
}

export async function createAccessToken(account: Account): Promise<XHRLogin> {
  const results = await prismaService.permissionOfAccount.findMany({
    where: { accountId: account.id },
    include: { permission: true }
  })

  const permissions = results?.map((r) => omit(r.permission, ['id', 'name', 'createdAt', 'updatedAt'])) || []
  const secretKey = createSecretKey(process.env.NEXT_PUBLIC_JWT_SECRET!, 'utf-8')
  const jwt = new SignJWT({
    sub: account.id,
    uid: account.uid,
    role: account.role,
    email: account.email,
    permissions
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(APP_NAME)
    .setExpirationTime(process.env.NEXT_PUBLIC_JWT_TTL || '1 day')

  const accessToken = await jwt.sign(secretKey)
  const refreshKey = uuidV5(`${APP_NAME}//${account.id}:${account.uid}`, NIL)

  return {
    accessToken,
    refreshKey,
    expiresAt: addYears(Date.now(), 1).toISOString()
  }
}
