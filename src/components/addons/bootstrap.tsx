'use client'

import { useCallback } from 'react'
import { useEffectOnce } from 'react-use'

import { configs } from '@/constants'
import { useLoader } from '@/hooks'
import { AuthService } from '@/services'
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

    const elm = document.querySelector('.ui--app-container')
    if (elm) {
      setTimeout(() => {
        elm.classList.add('ready')
        loader.off()
      }, 720)
    }
  }, [])

  // __EFFECT's
  useEffectOnce(() => {
    starter()
  })

  useEffectOnce(() => {
    function listener(e?: any) {
      if (e.target?.classList?.contains('btn-clicky')) playSound()
    }

    addEventListener('click', listener)
    return () => {
      removeEventListener('click', listener)
    }
  })

  // __RENDER
  return null
}
