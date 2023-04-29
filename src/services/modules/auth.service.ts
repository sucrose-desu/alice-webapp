import { addMonths } from 'date-fns'
import { configs, UserRole } from '@/constants'
import { cookie, storage } from '@/utils/storage'
import { notice } from '@/utils/notice'
import { dispatch } from '@/store'
import { setProfile, UserState } from '@/store/user.store'
import type { FormLogin } from '@/types'
import axios from '@/utils/axios'

interface RespLogin {
  accessToken: string
  refreshKey: string
  expiredAt: Date | string
}

export class AuthService {
  /**
   * Login service.
   *
   * @param data FormLogin
   */
  static async login(data: FormLogin): Promise<boolean | void> {
    try {
      const response = await axios.post<RespLogin>('/auth/login', data)
      if (response.data) {
        const { accessToken, refreshKey, expiredAt } = response.data

        cookie.set(configs.APP_AUTH_ACCESS, accessToken, { expires: new Date(expiredAt) })
        cookie.set(configs.APP_AUTH_REFRESH, refreshKey, { expires: addMonths(Date.now(), 2) })

        return true
      }
    } catch (error: any) {
      console.error('`AuthService.login`', error)
      notice.error({ title: error.code, content: error.message, duration: 0 })
    }
  }

  /**
   * GET user profile.
   */
  static async profile(): Promise<UserState | void> {
    try {
      const response = await axios.get<UserState>('/users/profile')
      if (response.data) {
        storage.set(configs.APP_USER_INFO, response.data)
        dispatch(setProfile(response.data))
        return response.data
      }
    } catch (error: any) {
      console.error('`AuthService.profile`', error)
      notice.error({ title: error.code, content: error.message })
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
        id: '',
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
