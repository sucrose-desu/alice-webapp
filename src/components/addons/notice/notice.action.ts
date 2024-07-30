import type { ReactNode } from 'react'
import { addSeconds } from 'date-fns'

import { dispatch } from '@/store'
import { generateId } from '@/utils'

import { addonAct } from '../addons.store'
import type { Notice, NoticeOptions } from './notice.type'

export class notice {
  static set(option: Omit<Notice, 'vid' | 'visible'>) {
    const vid = generateId()
    const title = option?.title || "Notification's"
    const duration = option?.duration !== 0 ? +addSeconds(Date.now(), option.duration || 3) : undefined

    const payload: Notice = {
      ...option,
      visible: true,
      vid,
      title,
      duration
    }

    dispatch(addonAct.setNotice(payload))

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

    dispatch(addonAct.setNotice(payload))
  }

  static clear() {
    dispatch(addonAct.setNotice(null))
  }
}
