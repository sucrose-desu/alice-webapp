import { NextRequest, NextResponse } from 'next/server'
import { APP_AUTH_ACCESS } from '@/constants/configs'

export const config = {
  matcher: ['/watch/:path*', '/my/:path*']
}

export async function middleware({ cookies, url, nextUrl }: NextRequest) {
  const isAuth = cookies.has(APP_AUTH_ACCESS)

  if (!isAuth) {
    const searchParams = new URLSearchParams(nextUrl.searchParams)
    searchParams.set('fallback', nextUrl.pathname)

    return NextResponse.redirect(new URL(`/guard/sign-in?${searchParams}`, url))
  }

  return NextResponse.next()
}
