import type { ReactNode } from 'react'

export type Toast = {
  vid: string
  visible: boolean
  children: ReactNode
  /**
   * Duration unit in seconds
   */
  duration?: number
}

export type ToastOptions = Pick<Toast, 'duration'> & {
  name?: string
}
