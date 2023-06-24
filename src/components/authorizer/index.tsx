import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { configs } from '@/constants'
import { useAuth, useMounted } from '@/hooks'
import { AuthService } from '@/services'
import { UserState, setProfile } from '@/store/user.store'
import { modal } from '@/utils/modal'
import { cookie, storage } from '@/utils/storage'

export default function Authorizer() {
  // __STATE <Rect.Hooks>
  const dispatch = useDispatch()
  const user = useAuth()

  // __EFFECT's
  useMounted(() => {
    const accessToken = cookie.get(configs.APP_AUTH_ACCESS)
    if (accessToken) {
      const user = storage.get<UserState>(configs.APP_USER_INFO, 1)

      if (user) {
        dispatch(setProfile(user))
      }
    } else {
      AuthService.logout()
    }
  })

  useEffect(() => {
    if (user.isAuth()) {
      modal.off('md-login')
    }
  }, [user])

  // __RENDER
  return null
}
