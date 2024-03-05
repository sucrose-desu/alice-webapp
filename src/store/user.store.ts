import { createAction, createReducer } from '@reduxjs/toolkit'
import { UserRole } from '@/constants'
import type { User } from '@/types/user'

/**
 * STATE
 */
export interface UserState extends User {}

export const initialState: UserState = {
  id: 0,
  uid: '',
  role: UserRole.GUEST,
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
  static setProfile = createAction<User, ActionTypes>(ActionTypes.SET_PROFILE)
  static reset = createAction<any, ActionTypes>(ActionTypes.RESET_PROFILE)
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
      return { id: 0, uid: '', role: UserRole.GUEST, displayName: '', avatar: '', email: '' }
    })
})
