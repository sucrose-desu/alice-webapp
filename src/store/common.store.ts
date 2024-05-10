import { createAction, createReducer } from '@reduxjs/toolkit'
import type { Genre } from '@/types/common'

/**
 * STATE
 */
export interface CommonState {
  genres: Genre[]
}

export const initialState: CommonState = {
  genres: []
}

/**
 * ACTION's
 */
export enum ActionTypes {
  SET_GENRES = 'SET_COMMON_GENRES'
}

export class commonAct {
  static setGenres = createAction<Genre[], ActionTypes>(ActionTypes.SET_GENRES)
}

/**
 * REDUCER's
 */
export default createReducer(initialState, (builder) => {
  return builder.addCase(commonAct.setGenres, (state, { payload }) => {
    state.genres = payload
  })
})
