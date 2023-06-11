import type { ReactNode } from 'react'
import { NoticeName } from '@/constants'

export type NoticeTypes = 'info' | 'success' | 'warn' | 'error'
export type NoticeContent = ReactNode | NoticeName

export interface Notice {
  name?: string
  type: NoticeTypes
  title: string
  content: NoticeContent
  visible?: boolean
  duration?: number
}

export interface NoticeOptions extends Pick<Notice, 'name' | 'duration'> {
  title?: string
}
