import type { ReactNode } from 'react'
import { dispatch } from '@/store'

import { addonAct } from '../addons.store'
import type { Dialog, DialogAlertOptions, DialogConfirmOptions, DialogModalOptions } from './dialog.type'

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

      dispatch(addonAct.setDialog(payload))
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

      dispatch(addonAct.setDialog(payload))
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

    dispatch(addonAct.setDialog(payload))
  }

  static off(vid: string) {
    const payload: any = { vid, visible: false }
    dispatch(addonAct.setDialog(payload))
  }
}
