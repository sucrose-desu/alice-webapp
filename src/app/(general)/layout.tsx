import { NavbarComponent } from '@/components/navbar'
import type { BaseProps } from '@/types'

export default function LayoutContainer({ children }: BaseProps) {
  // __RENDER
  return (
    <div className='ui--app-wrapper'>
      <main className='ui--router-view'>{children}</main>
      <NavbarComponent />
    </div>
  )
}
