import type { ReactNode } from 'react'

export type NoticeTypes = 'info' | 'success' | 'warn' | 'error'

export type Notice = {
  vid: string
  visible: boolean
  type: NoticeTypes
  title?: string
  children: ReactNode
  /**
   * Duration unit in seconds
   */
  duration?: number
}

export type NoticeOptions = Pick<Notice, 'title' | 'duration'> & {
  name?: string
}
