'use client'

import { configs } from '@/constants'
import { useLoader, useMounted } from '@/hooks'
import { AuthService, CommonService } from '@/services'
import { useDispatch } from '@/store'
import { userAct } from '@/store/user.store'
import { cookie } from '@/utils/storage'
import { Hexadecimal } from '@/utils/hex'
import type { User } from '@/types/user'
import { useCallback } from 'react'

export default function Bootstrap() {
  // __STATE's
  const dispatch = useDispatch()
  const loader = useLoader()

  // __FuNCTION's
  const starter = useCallback(async () => {
    const [accessToken, userProfile] = [cookie.get(configs.APP_AUTH_ACCESS), cookie.get(configs.APP_USER_INFO)]
    if (accessToken) {
      if (userProfile) {
        const user = JSON.parse(Hexadecimal.decode(userProfile)) as User
        dispatch(userAct.setProfile(user))
      }

      await AuthService.profile()
    } else {
      AuthService.signOut()
    }

    await CommonService.getGenres()

    const elm = document.querySelector('.ui--app-container')
    if (elm) {
      setTimeout(() => {
        elm.classList.add('ready')
        loader.off()
      }, 720)
    }
  }, [])

  // __EFFECT's
  useMounted(() => {
    starter()
  })

  // __RENDER
  return null
}
