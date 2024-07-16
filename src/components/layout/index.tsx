'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

import { NavigatorComponent } from './navigator'

type Props = { children: ReactNode }

export function LayoutContainer({ children }: Props) {
  // __STATE's
  const pathname = usePathname()
  const protectedPage = useMemo(() => pathname.startsWith('/watch'), [pathname])

  // __RENDER
  if (protectedPage) return children
  return (
    <div className='ui--app-container'>
      <main className='ui--router-view'>{children}</main>
      <NavigatorComponent />
    </div>
  )
}
