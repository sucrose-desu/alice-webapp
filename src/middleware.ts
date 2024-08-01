import { decodeJwt } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

import { AccountRole, configs } from '@/constants'
import type { JWTPayload } from '@/types/user'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|services|_next/static|_next/image|manifest|static|favicon.ico).*)'
  ]
}

export async function middleware({ cookies, url, nextUrl }: NextRequest) {
  if (/^\/(account|tavern|watch)/g.test(nextUrl.pathname)) {
    const token = cookies.get(configs.APP_AUTH_ACCESS)
    if (token) {
      const payload = decodeJwt<JWTPayload>(token.value)

      if (
        /^\/tavern/g.test(nextUrl.pathname) &&
        [AccountRole.ROOT, AccountRole.ADMIN].indexOf(payload.role) < 0
      ) {
        return NextResponse.redirect(new URL(`/browse`, url))
      } else {
        return NextResponse.redirect(new URL(`/tavern/lobby`, url))
      }
    } else {
      if (!/^\/guard/g.test(nextUrl.pathname)) {
        const searchParams = new URLSearchParams(nextUrl.searchParams)
        searchParams.set('fallback', nextUrl.pathname)

        return NextResponse.redirect(new URL(`/guard/sign-in?${searchParams}`, url))
      }
    }
  }

  return NextResponse.next()
}
