import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { configs, UserRole } from '@/constants'
import { useSelector } from '@/store'
import { cookie } from '@/utils/storage'

export function useAuth() {
  // __STATE's
  const router = useRouter()
  const user = useSelector(({ user }) => user)

  // __RETURN
  return useMemo(
    () => ({
      ...user,
      isAuth: () => {
        const accessToken = cookie.get(configs.APP_AUTH_ACCESS)
        return Boolean(user.id && accessToken)
      }
    }),
    [router, user]
  )
}
