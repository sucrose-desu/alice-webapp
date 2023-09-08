import { addDays } from 'date-fns'
import { configs, UserRole } from '@/constants'
import { dispatch } from '@/store'
import { setProfile } from '@/store/user.store'
import { cookie, storage } from '@/utils/storage'
import type { FormLogin } from '@/types/form'
import type { User } from '@/types/user'

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
      // const response = await axios.post<XHRLogin>('/auth/login', data)
      // if (response.data) {
      //   const { accessToken, refreshKey, expiredAt } = response.data

      //   cookie.set(configs.APP_AUTH_ACCESS, accessToken, { expires: new Date(expiredAt) })
      //   cookie.set(configs.APP_AUTH_REFRESH, refreshKey, { expires: new Date(expiredAt) })

      //   return true
      // }

      const expires = addDays(Date.now(), 30)

      cookie.set(configs.APP_AUTH_ACCESS, expires.toUTCString(), { expires })
      cookie.set(configs.APP_AUTH_REFRESH, expires.toUTCString(), { expires })

      return true
    } catch (error) {
      tryCatch('`AuthService.login`', error)
    }
  }

  /**
   * GET user profile.
   */
  static async profile() {
    try {
      // const response = await axios.get<User>('/users/profile')
      // if (response.data) {
      //   storage.set(configs.APP_USER_INFO, response.data)
      //   dispatch(setProfile(response.data))
      // }

      const user = {
        id: 1,
        role: UserRole.GUEST,
        avatar: 'https://i.pravatar.cc/320',
        displayName: 'display name',
        username: 'app.ts',
        email: 'app.ts@alice.live',
        isVerified: false,
        isActive: true
      }

      storage.set(configs.APP_USER_INFO, user)
      dispatch(setProfile(user))
    } catch (error) {
      tryCatch('`AuthService.profile`', error)
    }
  }

  /**
   * Destroy all browser session.
   *
   * @param cb Callback function.
   */
  static logout(cb?: Function) {
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
