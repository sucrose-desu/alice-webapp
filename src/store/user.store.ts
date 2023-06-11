import { createAction, createReducer } from '@reduxjs/toolkit'
import { UserRole } from '@/constants'
import type { User } from '@/types/user'

/**
 * STATE
 */
export interface UserState extends User {}

export const initialState: UserState = {
  id: 0,
  role: UserRole.GUEST,
  avatar: '',
  displayName: '',
  username: '',
  email: ''
}

/**
 * ACTION's
 */
export enum ActionTypes {
  SET_PROFILE = 'SET_USER_PROFILE'
}

export const setProfile = createAction<User, ActionTypes>(ActionTypes.SET_PROFILE)

/**
 * REDUCER's
 */
export default createReducer(initialState, (builder) => {
  return builder.addCase(setProfile, (state, { payload }) => {
    Object.assign(state, payload)
  })
})
