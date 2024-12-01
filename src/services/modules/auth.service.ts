import { configs } from '@/constants'
import { dispatch } from '@/store'
import { userAct } from '@/store/user.store'
import type { FormSignIn } from '@/types/form'
import type { User } from '@/types/user'
import { cookie, storage } from '@/utils/storage'

import axios from '../axios'
import { tryCatch } from '../catch'

export class AuthService {
  /**
   * Sign-In
   *
   * @param data FormSignIn
   */
  static async signIn(data: FormSignIn) {
    try {
      const response = await axios.post<XHRSignIn>('/auth/sign-in', data)
      if (response.data) {
        const { accessToken, refreshKey, expiresAt } = response.data

        cookie.set(configs.APP_AUTH_ACCESS, accessToken, { expires: new Date(expiresAt) })
        cookie.set(configs.APP_AUTH_REFRESH, refreshKey, { expires: new Date(expiresAt) })

        return true
      }
    } catch (error) {
      tryCatch('`AuthService.signIn`', error)
    }
  }

  /**
   * Destroy all browser session.
   *
   * @param cb Callback function.
   */
  static signOut(cb?: Function) {
    cookie.remove(configs.APP_AUTH_ACCESS)
    cookie.remove(configs.APP_AUTH_REFRESH)
    storage.remove(configs.APP_USER_INFO)

    dispatch(userAct.reset())

    if (cb) cb()
  }

  /**
   * GET user profile.
   */
  static async profile() {
    try {
      const response = await axios.get<User>('/users/me')
      if (response.data) {
        storage.set(configs.APP_USER_INFO, response.data)
        dispatch(userAct.setProfile(response.data))
      }
    } catch (error) {
      tryCatch('`AuthService.profile`', error)
    }
  }
}
