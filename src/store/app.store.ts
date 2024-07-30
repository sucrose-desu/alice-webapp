import { createAction, createReducer } from '@reduxjs/toolkit'
import { Theme } from '@/constants'

/**
 * STATE
 */
export type AppState = {
  appVersion: string
  lang: string
  theme: Theme
  loader: boolean
}

export const initialState: AppState = {
  appVersion: 'v0.2-beta (July, 2024)',
  lang: 'en-US',
  theme: Theme.DARK,
  loader: true
}

/**
 * ACTION's
 */
export enum ActionTypes {
  SET_LANG = 'SET_APP_LANGUAGE',
  SET_THEME = 'SET_APP_THEME',
  SET_LOADER = 'SET_APP_LOADER'
}

export class appAct {
  static setLanguage = createAction<string, ActionTypes>(ActionTypes.SET_LANG)
  static setTheme = createAction<Theme, ActionTypes>(ActionTypes.SET_THEME)
  static setLoader = createAction<boolean, ActionTypes>(ActionTypes.SET_LOADER)
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
})
