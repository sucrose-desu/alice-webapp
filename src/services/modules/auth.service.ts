import { configs, UserRole } from '@/constants'
import { dispatch } from '@/store'
import { setProfile, UserState } from '@/store/user.store'
import { cookie, storage } from '@/utils/storage'
import type { FormLogin } from '@/types/form'

import axios from '../axios'
import { tryCatch } from '../catch'

export class AuthService {
  /**
   * Login service.
   *
   * @param data FormLogin
   */
  static async login(data: FormLogin) {
    try {
      const response = await axios.post<XHRLogin>('/auth/login', data)
      if (response.data) {
        const { accessToken, refreshKey, expiredAt } = response.data

        cookie.set(configs.APP_AUTH_ACCESS, accessToken, { expires: new Date(expiredAt) })
        cookie.set(configs.APP_AUTH_REFRESH, refreshKey, { expires: new Date(expiredAt) })

        return true
      }
    } catch (error: any) {
      tryCatch('`AuthService.login`', error)
    }
  }

  /**
   * GET user profile.
   */
  static async profile() {
    try {
      const response = await axios.get<UserState>('/users/profile')
      if (response.data) {
        storage.set(configs.APP_USER_INFO, response.data)
        dispatch(setProfile(response.data))
      }
    } catch (error: any) {
      tryCatch('`AuthService.profile`', error)
    }
  }

  /**
   * Destroy all browser session.
   *
   * @param cb Callback function.
   */
  static logout(cb?: Function): void {
    cookie.remove(configs.APP_AUTH_ACCESS)
    cookie.remove(configs.APP_AUTH_REFRESH)
    storage.remove(configs.APP_USER_INFO)

    dispatch(
      setProfile({
        id: 0,
        role: UserRole.GUEST,
        avatar: '',
        displayName: '',
        username: '',
        email: ''
      })
    )

    if (cb) cb()
  }
}
