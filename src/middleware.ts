import { NextRequest, NextResponse } from 'next/server'
import { APP_AUTH_ACCESS } from '@/constants/configs'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|services|_next/static|_next/image|manifest|static|favicon.ico).*)',
    '/watch/:path*',
    '/my/:path*'
  ]
}

export async function middleware({ cookies, url, nextUrl }: NextRequest) {
  const isAuth = cookies.has(APP_AUTH_ACCESS)

  if (!isAuth) {
    const searchParams = new URLSearchParams(nextUrl.searchParams)
    searchParams.set('fallback', nextUrl.pathname)

    return NextResponse.redirect(`/guard/sign-in?${searchParams}`)
  }

  return NextResponse.next()
}
