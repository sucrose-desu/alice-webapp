import { NextRequest, NextResponse } from 'next/server'
import { configs } from '@/constants'

export const config = {
  matcher: ['/account/:path*']
}

export async function middleware({ url, nextUrl, cookies }: NextRequest) {
  if (!cookies.has(configs.APP_AUTH_ACCESS)) {
    const searchParams = new URLSearchParams(nextUrl.searchParams)
    searchParams.set('fallback', nextUrl.pathname)

    return NextResponse.redirect(new URL(`/login?${searchParams}`, url))
  }

  return NextResponse.next()
}
