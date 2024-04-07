import { NextRequest, NextResponse } from 'next/server'
import { APP_AUTH_ACCESS } from '@/constants/configs'

export const config = {
  matcher: ['/watch/:path*', '/my/:path*']
}

export async function middleware({ headers, cookies, url, nextUrl }: NextRequest) {
  const isAuth = cookies.has(APP_AUTH_ACCESS)

  if (isAuth) {
    return NextResponse.next()
  } else {
    const searchParams = new URLSearchParams(nextUrl.searchParams)
    searchParams.set('fallback', nextUrl.pathname)

    // if (nextUrl.pathname.startsWith('/watch')) {
    //   return NextResponse.redirect(new URL(`/login?${searchParams}`, url))
    // } else if (nextUrl.pathname.startsWith('/my')) {
    //   return NextResponse.redirect(new URL(`/login?${searchParams}`, url))
    // } else {
    //   return NextResponse.redirect(new URL(`/login?${searchParams}`, url))
    // }

    return NextResponse.redirect(new URL(`/guard/sign-in?${searchParams}`, url))
  }
}
