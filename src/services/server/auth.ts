import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { type Account, type Permission, type PermissionOfAccount } from '@prisma/client'
import { createSecretKey } from 'crypto'
import { addYears } from 'date-fns'
import { decodeJwt, SignJWT } from 'jose'
import { v5 as uuidV5, NIL } from 'uuid'

import { APP_NAME } from '@/constants/configs'
import type { JWTPayload } from '@/types/user'

export function useAuthGuard(headers: ReadonlyHeaders) {
  const bearerToken = headers.get('Authorization')

  if (bearerToken) {
    const accessToken = bearerToken.replace('Bearer', '').trim()
    return decodeJwt(accessToken) as JWTPayload
  }

  throw new Response(null, { status: 401, statusText: 'Unauthorized' })
}

type AccountWithPermissions = Account & { permissions: (PermissionOfAccount & { permission: Permission })[] }
export async function signAuthToken(account: AccountWithPermissions): Promise<XHRSignIn> {
  const secretKey = createSecretKey(process.env.NEXT_PUBLIC_JWT_SECRET!, 'utf-8')
  const jwt = new SignJWT({
    sub: account.id,
    uid: account.uid,
    role: account.role,
    permissions: account.permissions.map(({ permission: { id, createdAt, updatedAt, ...permission } }) => permission)
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
