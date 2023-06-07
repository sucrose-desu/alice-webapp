import type { ReactNode } from 'react'
import { DialogName } from '@/constants'

export type DialogContent = ReactNode | DialogName

export interface Dialog {
  visible: boolean
  type?: 'alert' | 'confirm'
  title?: string
  content: DialogContent
  confirmLabel?: string
  cancelLabel?: string
  resolve?: (value: DialogResults | PromiseLike<DialogResults>) => void
}

export interface DialogOptions extends Omit<Dialog, 'visible' | 'content' | 'resolve'> {}

export interface DialogResults {
  isConfirmed: boolean
  isDenied: boolean
}
