import { createAction, createReducer } from '@reduxjs/toolkit'
import { UserRole } from '@/constants'

/**
 * STATE
 */
export interface UserState {
  id: string
  role: UserRole
  avatar: string
  displayName: string
  username: string
  email: string
  bio?: string
  isVerified?: boolean
  isActive?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export const initialState: UserState = {
  id: '',
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

export const setProfile = createAction<UserState, ActionTypes>(ActionTypes.SET_PROFILE)

/**
 * REDUCER's
 */
export default createReducer(initialState, (builder) => {
  return builder.addCase(setProfile, (state, { payload }) => {
    Object.assign(state, payload)
  })
})
