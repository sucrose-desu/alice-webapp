import { NextRequest, NextResponse } from 'next/server'
import { configs } from '@/constants'

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: '/((?!api|_next/static|_next/image|manifest|static|favicon.ico).*)'
}

export function middleware({ cookies, nextUrl, url }: NextRequest) {
  if (nextUrl.pathname.startsWith('/user')) {
    const accessToken = cookies.get(configs.APP_AUTH_ACCESS)
    if (!accessToken) {
      return NextResponse.redirect(new URL('/browse', url))
    }
  }

  return NextResponse.next()
}
