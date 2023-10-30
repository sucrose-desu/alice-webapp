'use client'

import { useEffect } from 'react'

import { configs } from '@/constants'
import { useAuth, useLoader, useMounted } from '@/hooks'
import { AuthService } from '@/services'
import { useDispatch } from '@/store'
import { setProfile } from '@/store/user.store'
import { setGenres } from '@/store/common.store'
import { modal } from '@/utils/addon'
import { cookie, storage } from '@/utils/storage'
import type { User } from '@/types/user'

import Genres from '@/constants/genre'

export default function Bootstrap() {
  // __STATE <Rect.Hooks>
  const dispatch = useDispatch()
  const loader = useLoader()
  const user = useAuth()

  // __EFFECT's
  useMounted(() => {
    if (cookie.get(configs.APP_AUTH_ACCESS)) {
      const user = storage.get<User>(configs.APP_USER_INFO, 1)
      if (user) {
        dispatch(setProfile(user))
      }

      // AuthService.profile()
    } else {
      AuthService.logout()
    }

    dispatch(setGenres(Genres))
  })

  useEffect(() => {
    if (user.isAuth()) {
      modal.off('md-login')
    }
  }, [user])

  // __RENDER
  return null
}
