import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { configs, UserRole } from '@/constants'
import { isEqual } from '@/utils'
import { cookie } from '@/utils/storage'

import type { StoreTypes } from '@/store'

export function useAuth() {
  // __STATE <React.Hooks>
  const router = useRouter()
  const user = useSelector(({ user }: StoreTypes) => user)

  // __RETURN
  return useMemo(() => {
    return {
      ...user,
      isAuth: () => {
        const refreshKey = cookie.get(configs.APP_AUTH_REFRESH)
        return user.id && refreshKey ? true : false
      },
      isAdmin: () => isEqual(user.role, UserRole.ADMIN)
    }
  }, [router, user])
}
