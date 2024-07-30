import { createAction, createReducer } from '@reduxjs/toolkit'
import type { Dialog } from './dialog/dialog.type'
import type { Notice } from './notice/notice.type'
import type { Toast } from './toast/toast.type'

/**
 * STATE
 */
export type AddonState = {
  dialogs: Dialog[]
  notices: Notice[]
  toasts: Toast[]
}

export const initialState: AddonState = {
  dialogs: [],
  notices: [],
  toasts: []
}

/**
 * ACTION's
 */
export enum ActionTypes {
  SET_DIALOG = 'SET_ADDON_DIALOG',
  SET_NOTICE = 'SET_ADDON_NOTICE',
  SET_TOAST = 'SET_ADDON_TOAST'
}

export class addonAct {
  static setDialog = createAction<Dialog, ActionTypes>(ActionTypes.SET_DIALOG)
  static setNotice = createAction<Notice | null, ActionTypes>(ActionTypes.SET_NOTICE)
  static setToast = createAction<Toast | null, ActionTypes>(ActionTypes.SET_TOAST)
}

/**
 * REDUCER's
 */
export default createReducer(initialState, (builder) => {
  const regex = /^rm:|remove:/g

  return builder
    .addCase(addonAct.setDialog, (state, { payload }) => {
      if (state.dialogs.length) {
        const vid = payload.vid.replaceAll(regex, '').trim()

        if (regex.test(payload.vid)) {
          state.dialogs = state.dialogs.filter((r) => r.vid !== vid)
        } else {
          if (payload.visible) state.dialogs.push(payload)
          else {
            state.dialogs = state.dialogs.map((r) => {
              if (r.vid === vid) r.visible = payload.visible
              return r
            })
          }
        }
      } else {
        state.dialogs = [payload]
      }
    })

    .addCase(addonAct.setNotice, (state, { payload }) => {
      if (state.notices.length) {
        if (payload) {
          const vid = payload.vid.replaceAll(regex, '').trim()

          if (regex.test(payload.vid)) {
            state.notices = state.notices.filter((r) => r.vid !== vid)
          } else {
            state.notices.push(payload)
          }
        } else {
          state.notices = []
        }
      } else {
        state.notices = payload ? [payload] : []
      }
    })

    .addCase(addonAct.setToast, (state, { payload }) => {
      if (state.toasts.length) {
        if (payload) {
          const vid = payload.vid.replaceAll(regex, '').trim()

          if (regex.test(payload.vid)) {
            state.toasts = state.toasts.filter((r) => r.vid !== vid)
          } else {
            state.toasts.unshift(payload)
          }
        } else {
          state.toasts = []
        }
      } else {
        state.toasts = payload ? [payload] : []
      }
    })
})
