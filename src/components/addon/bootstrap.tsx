'use client'

import { useCallback, useEffect } from 'react'

import { configs } from '@/constants'
import { useLoader, useMounted } from '@/hooks'
import { AuthService, CommonService } from '@/services'
import { useDispatch } from '@/store'
import { userAct } from '@/store/user.store'
import { playSound } from '@/utils/media'
import { cookie } from '@/utils/storage'

export default function Bootstrap() {
  // __STATE's
  const dispatch = useDispatch()
  const loader = useLoader()

  // __FUNCTION's
  const starter = useCallback(async () => {
    const accessToken = cookie.get(configs.APP_AUTH_ACCESS)
    if (accessToken) {
      const profile = cookie.get(configs.APP_USER_INFO, 1)
      if (profile) {
        dispatch(userAct.setProfile(profile))
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

  useEffect(() => {
    function listener(e?: any) {
      if (e.target?.classList?.contains('btn-clicky')) playSound()
    }

    addEventListener('click', listener)
    return () => {
      removeEventListener('click', listener)
    }
  }, [])

  // __RENDER
  return null
}
