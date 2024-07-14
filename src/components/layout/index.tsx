'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

import { NavigatorComponent } from './navigator'
import { WaveComponent } from './wave'

type Props = { node: ReactNode }

export function LayoutContainer({ node }: Props) {
  // __STATE's
  const pathname = usePathname()
  const protectedPage = useMemo(() => pathname.startsWith('/watch'), [pathname])

  // __RENDER
  if (protectedPage) return node
  return (
    <div className='ui--app-container'>
      <WaveComponent />
      <main className='ui--router-view'>{node}</main>
      <NavigatorComponent />
    </div>
  )
}
