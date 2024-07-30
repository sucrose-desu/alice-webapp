import { createAction, createReducer } from '@reduxjs/toolkit'
import { AccountRole } from '@/constants'
import type { User as UserState } from '@/types/user'

/**
 * STATE
 */
export const initialState: Partial<UserState> = {
  id: '',
  uid: '',
  role: AccountRole.GUEST,
  displayName: '',
  avatar: '',
  email: ''
}

/**
 * ACTION's
 */
export enum ActionTypes {
  SET_PROFILE = 'SET_USER_PROFILE',
  RESET_PROFILE = 'RESET_USER_PROFILE'
}

export class userAct {
  static setProfile = createAction<UserState, ActionTypes>(ActionTypes.SET_PROFILE)
  static reset = createAction<void, ActionTypes>(ActionTypes.RESET_PROFILE)
}
/**
 * REDUCER's
 */
export default createReducer(initialState, (builder) => {
  return builder
    .addCase(userAct.setProfile, (state, { payload }) => {
      Object.assign(state, payload)
    })
    .addCase(userAct.reset, () => {
      return { id: '', uid: '', role: AccountRole.GUEST, displayName: '', avatar: '', email: '' }
    })
})
