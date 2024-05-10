import type { ReactNode } from 'react'
import { addSeconds } from 'date-fns'

import { dispatch } from '@/store'
import { appAct } from '@/store/app.store'
import type {
  Dialog,
  DialogAlertOptions,
  DialogConfirmOptions,
  DialogModalOptions,
  Notice,
  NoticeOptions
} from '@/types/addon'

export class dialog {
  static async alert(children: ReactNode, options?: DialogAlertOptions) {
    return new Promise((resolve, reject) => {
      const vid = Math.random().toString(16).slice(2)
      const payload: Extract<Dialog, { type: 'alert' }> = {
        ...options,
        type: 'alert',
        visible: true,
        vid,
        children,
        resolve
      }

      dispatch(appAct.setDialog(payload))
    })
  }

  static async confirm(children: ReactNode, options?: DialogConfirmOptions) {
    return new Promise((resolve, reject) => {
      const vid = Math.random().toString(16).slice(2)
      const payload: Extract<Dialog, { type: 'confirm' }> = {
        ...options,
        type: 'confirm',
        visible: true,
        vid,
        children,
        resolve
      }

      dispatch(appAct.setDialog(payload))
    })
  }

  static modal(children: ReactNode, options?: DialogModalOptions) {
    const vid = options?.name || Math.random().toString(16).slice(2)
    const payload: Extract<Dialog, { type: 'modal' }> = {
      type: 'modal',
      name: vid,
      visible: true,
      vid,
      children,
      ...options
    }

    dispatch(appAct.setDialog(payload))
  }

  static off(vid: string) {
    const payload: any = { vid, visible: false }
    dispatch(appAct.setDialog(payload))
  }
}

export class notice {
  static set(option: Omit<Notice, 'vid' | 'visible'>) {
    const vid = Math.random().toString(16).slice(2)
    const title = option?.title || "Notification's"
    const duration = option?.duration !== 0 ? +addSeconds(Date.now(), option.duration || 3) : undefined

    const payload: Notice = {
      ...option,
      visible: true,
      vid,
      title,
      duration
    }

    dispatch(appAct.setNotice(payload))

    return vid
  }

  static info(children: ReactNode, option?: NoticeOptions) {
    return this.set({ ...option, type: 'info', children })
  }

  static success(children: ReactNode, option?: NoticeOptions) {
    return this.set({ ...option, type: 'success', children })
  }

  static warn(children: ReactNode, option?: NoticeOptions) {
    return this.set({ ...option, type: 'warn', children })
  }

  static error(children: ReactNode, option?: NoticeOptions) {
    return this.set({ ...option, type: 'error', children })
  }

  static close(name: string) {
    const payload: Notice = {
      vid: `rm:${name}`,
      type: 'info',
      children: null,
      visible: false
    }

    dispatch(appAct.setNotice(payload))
  }

  static clear() {
    dispatch(appAct.setNotice(null))
  }
}
