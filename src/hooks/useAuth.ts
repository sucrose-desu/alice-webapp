import { useMemo } from 'react'

import { APP_AUTH_ACCESS } from '@/constants/configs'
import { useSelector } from '@/store'
import { cookie } from '@/utils/storage'

export function useAuth() {
  // __STATE's
  const user = useSelector(({ user }) => user)

  // __RETURN
  return useMemo(
    () => ({
      ...user,
      isAuth: () => {
        const accessToken = cookie.get(APP_AUTH_ACCESS)
        return Boolean(user.id && accessToken)
      }
    }),
    [user]
  )
}
