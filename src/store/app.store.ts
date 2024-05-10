import { createAction, createReducer } from '@reduxjs/toolkit'
import { Theme } from '@/constants'
import type { Notice, Dialog } from '@/types/addon'

/**
 * STATE
 */
export type AppState = {
  appVersion: string
  lang: string
  theme: Theme
  loader: boolean
  dialogs: Dialog[]
  notices: Notice[]
}

export const initialState: AppState = {
  appVersion: 'v0.2-beta (July, 2024)',
  lang: 'en-US',
  theme: Theme.DARK,
  loader: true,
  dialogs: [],
  notices: []
}

/**
 * ACTION's
 */
export enum ActionTypes {
  SET_LANG = 'SET_APP_LANGUAGE',
  SET_THEME = 'SET_APP_THEME',
  SET_LOADER = 'SET_APP_LOADER',
  SET_DIALOG = 'SET_APP_DIALOG',
  SET_NOTICE = 'SET_APP_NOTICE'
}

export class appAct {
  static setLanguage = createAction<string, ActionTypes>(ActionTypes.SET_LANG)
  static setTheme = createAction<Theme, ActionTypes>(ActionTypes.SET_THEME)
  static setLoader = createAction<boolean, ActionTypes>(ActionTypes.SET_LOADER)
  static setDialog = createAction<Dialog, ActionTypes>(ActionTypes.SET_DIALOG)
  static setNotice = createAction<Notice | null, ActionTypes>(ActionTypes.SET_NOTICE)
}

/**
 * REDUCER's
 */
export default createReducer(initialState, (builder) => {
  return builder
    .addCase(appAct.setLanguage, (state, { payload }) => {
      state.lang = payload
    })

    .addCase(appAct.setTheme, (state, { payload }) => {
      state.theme = payload
    })

    .addCase(appAct.setLoader, (state, { payload }) => {
      state.loader = payload
    })

    .addCase(appAct.setDialog, (state, { payload }) => {
      if (state.dialogs.length) {
        const regex = /^rm:|remove:/g
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

    .addCase(appAct.setNotice, (state, { payload }) => {
      if (state.notices.length) {
        if (payload) {
          const regex = /^rm:|remove:/g
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
})
