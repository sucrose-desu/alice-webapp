'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

import { NavigatorComponent } from './navigator'

type Props = { node: ReactNode }

export function LayoutContainer({ node }: Props) {
  // __STATE <Rect.Hooks>
  const pathname = usePathname()
  const protectedPage = useMemo(() => pathname.startsWith('/watch'), [pathname])

  // __RENDER
  if (protectedPage) return <>{node}</>
  return (
    <div className='ui--app-container'>
      <main className='ui--router-view'>{node}</main>
      <NavigatorComponent />
    </div>
  )
}
