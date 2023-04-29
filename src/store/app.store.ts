import { createAction, createReducer } from '@reduxjs/toolkit'
import { Theme } from '@/constants'
import { ArrayService } from '@/utils/array'
import type { Dialog, Modal, Notice } from '@/types'

/**
 * STATE
 */
export interface AppState {
  appVersion: string
  lang: string
  theme: Theme
  loader: boolean
  dialog: Dialog
  modal: Modal[]
  notice: Notice[]
}

export const initialState: AppState = {
  appVersion: 'v0.1-beta (April, 2023)',
  lang: 'en-US',
  theme: Theme.DARK,
  loader: false,
  dialog: {
    visible: false,
    type: 'alert',
    content: null
  },
  modal: [],
  notice: []
}

/**
 * ACTION's
 */
export enum ActionTypes {
  SET_LANG = 'SET_APP_LANGUAGE',
  SET_THEME = 'SET_APP_THEME',
  SET_LOADER = 'SET_APP_LOADER',
  SET_DIALOG = 'SET_APP_DIALOG',
  SET_MODALS = 'SET_APP_MODALS',
  SET_NOTICE = 'SET_APP_NOTICE'
}

export const setLanguage = createAction<string, ActionTypes>(ActionTypes.SET_LANG)
export const setTheme = createAction<Theme, ActionTypes>(ActionTypes.SET_THEME)
export const setLoader = createAction<boolean, ActionTypes>(ActionTypes.SET_LOADER)
export const setDialog = createAction<Dialog, ActionTypes>(ActionTypes.SET_DIALOG)
export const setModal = createAction<Modal, ActionTypes>(ActionTypes.SET_MODALS)
export const setNotice = createAction<Notice | null, ActionTypes>(ActionTypes.SET_NOTICE)

/**
 * REDUCER's
 */
export default createReducer(initialState, (builder) => {
  const regex = /^rm:|remove:/gi

  return builder
    .addCase(setLanguage, (state, { payload }) => {
      state.lang = payload
    })

    .addCase(setTheme, (state, { payload }) => {
      state.theme = payload
    })

    .addCase(setLoader, (state, { payload }) => {
      state.loader = payload
    })

    .addCase(setDialog, (state, { payload }) => {
      state.dialog = {
        ...payload,
        type: payload?.type || 'alert',
        confirmLabel: payload?.confirmLabel || 'OK',
        cancelLabel: payload?.cancelLabel || 'Cancel',
        resolve: payload?.resolve
      }
    })

    .addCase(setModal, (state, { payload }) => {
      const { vid } = payload
      if (regex.test(vid)) {
        const _vid = vid.replace(regex, '').trim()
        state.modal = ArrayService.remove(state.modal, 'vid', _vid)
      } else {
        if (!payload.visible) {
          state.modal = state.modal.map((record) => {
            if (record.vid === vid) record.visible = payload.visible
            return record
          })
        } else {
          state.modal = [...state.modal, payload]
        }
      }
    })

    .addCase(setNotice, (state, { payload }) => {
      if (payload) {
        const { vid } = payload
        if (regex.test(vid!)) {
          const _vid = vid!.replace(regex, '').trim()
          state.notice = ArrayService.remove(state.notice, 'vid', _vid)
        } else {
          state.notice = [...state.notice, payload]
        }
      } else {
        state.notice = []
      }
    })
})
