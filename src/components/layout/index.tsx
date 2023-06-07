import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactNode, useMemo } from 'react'

import { NavigatorComponent } from './navigator'

interface Props {
  children: ReactNode
}

export function LayoutContainer({ children }: Props) {
  // __STATE <Rect.Hooks>
  const router = useRouter()
  const protectedPage = useMemo(() => router.pathname.startsWith('/watch'), [router])

  // __RENDER
  if (protectedPage) return <>{children}</>
  return (
    <div className='ui--app-container'>
      <main className='ui--router-view'>{children}</main>
      <NavigatorComponent />

      <Image className='bg-gradient violet' src='/static/media/gradient-right-dark.svg' loading='lazy' alt='' width={1420} height={1420} />
      <Image className='bg-gradient blue' src='/static/media/gradient-left-dark.svg' loading='lazy' alt='' width={1260} height={1210} />
    </div>
  )
}
