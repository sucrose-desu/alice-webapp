'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

import { NavigatorComponent } from './navigator'

type Props = { node: ReactNode }

export function LayoutContainer({ node }: Props) {
  // __STATE's
  const pathname = usePathname()
  const protectedPage = useMemo(() => pathname.startsWith('/watch'), [pathname])

  // __RENDER
  if (protectedPage) return node
  return (
    <div className='ui--app-container'>
      {/* <div className='pointer-events-none fixed inset-x-0 top-0 flex justify-center overflow-hidden opacity-20'>
        <picture>
          <source srcSet='/static/media/docs.avif' type='image/avif' />
          <img className='w-[72rem] max-w-none flex-none' src='/static/media/docs.png' alt='' decoding='async' />
        </picture>
      </div> */}

      <main className='ui--router-view'>{node}</main>
      <NavigatorComponent />
    </div>
  )
}
