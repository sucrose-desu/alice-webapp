import type { ReactNode } from 'react'

export type DialogAlert = {
  type: 'alert'
  title?: string
  resolve?: (value?: any) => void
}

export type DialogConfirmResolve = {
  isConfirmed: boolean
  isDenied: boolean
  value?: string
}

export type DialogConfirm = {
  type: 'confirm'
  title?: string
  btnConfirm?: string
  btnCancel?: string
  useInput?: boolean
  resolve: (value: DialogConfirmResolve | PromiseLike<DialogConfirmResolve>) => void
}

export type DialogModal = {
  type: 'modal'
  name?: string
}

export type Dialog = (DialogAlert | DialogConfirm | DialogModal) & {
  vid: string
  visible: boolean
  children: ReactNode
  allowEscape?: boolean
  style?: {
    align?: 'start' | 'center'
  }
}

export type DialogOmitOptions = 'type' | 'vid' | 'visible' | 'children'
export type DialogAlertOptions = Omit<Extract<Dialog, { type: 'alert' }>, DialogOmitOptions | 'resolve'>
export type DialogConfirmOptions = Omit<Extract<Dialog, { type: 'confirm' }>, DialogOmitOptions | 'resolve'>
export type DialogModalOptions = Omit<Extract<Dialog, { type: 'modal' }>, DialogOmitOptions>

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
