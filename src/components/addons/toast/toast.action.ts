import type { ReactNode } from 'react'
import { addSeconds } from 'date-fns'

import { dispatch } from '@/store'
import { generateId } from '@/utils'

import { addonAct } from '../addons.store'
import type { Toast, ToastOptions } from './toast.type'

export class toast {
  static on(message: string, options?: ToastOptions) {
    const vid = options?.name || generateId()
    const duration = options?.duration !== 0 ? +addSeconds(Date.now(), options?.duration || 2) : undefined

    const action = addonAct.setToast({
      visible: true,
      vid,
      duration,
      children: message
    })

    dispatch(action)

    return vid
  }

  static off(name: string) {
    const action = addonAct.setToast({
      vid: `rm:${name}`,
      visible: false,
      children: null
    })

    dispatch(action)
  }

  static clear() {
    dispatch(addonAct.setToast(null))
  }
}
