import type { ReactNode } from 'react'
import { NoticeName } from '@/constants'

export type NoticeTypes = 'info' | 'success' | 'warn' | 'error'
export type NoticeContent = ReactNode | NoticeName

export interface Notice {
  vid?: string
  visible: boolean
  type: NoticeTypes
  name?: string
  title: string
  content: NoticeContent
  duration?: number
}

export interface NoticeOptions extends Omit<Notice, 'visible' | 'type'> {}
