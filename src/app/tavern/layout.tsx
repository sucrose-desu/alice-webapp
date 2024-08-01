import type { BaseProps } from '@/types'

export default function LayoutContainer({ children }: BaseProps) {
  // __RENDER
  return (
    <div className='ui--tavern-wrapper'>
      <main className='ui--router-view'>{children}</main>
    </div>
  )
}
