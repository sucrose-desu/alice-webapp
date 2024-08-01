import type { BaseProps } from '@/types'

export function WrapperContainer({ children }: BaseProps) {
  // __RENDER
  return (
    <div className='ui--app-wrapper'>
      <main className='ui--router-view'>{children}</main>
    </div>
  )
}
