import type { ReactNode } from 'react'

export type NoticeTypes = 'info' | 'success' | 'warn' | 'error'

export interface Dialog {
  visible: boolean
  type?: 'alert' | 'confirm'
  title?: string
  content: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  resolve?: (value: DialogResults | PromiseLike<DialogResults>) => void
}

export interface Modal {
  vid: string
  visible: boolean
  className?: string
  allowEscape?: boolean
  content: ReactNode
}

export interface Notice {
  visible?: boolean
  name?: string
  type: NoticeTypes
  title: string
  content: ReactNode
  duration?: number
}

export interface DialogResults {
  isConfirmed: boolean
  isDenied: boolean
}

export interface DialogOptions extends Omit<Dialog, 'visible' | 'content' | 'resolve'> {}

export interface ModalOptions extends Pick<Modal, 'className' | 'allowEscape'> {}

export interface NoticeOptions extends Pick<Notice, 'name' | 'duration'> {
  title?: string
}
