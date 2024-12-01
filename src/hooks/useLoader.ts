import { useCallback, useMemo } from 'react'

import { dispatch, useSelector } from '@/store'
import { appAct } from '@/store/app.store'

export function useLoader() {
  // __STATE's
  const status = useSelector(({ app }) => app.loader)

  // __FUNCTION's
  const handleAction = useCallback((active: boolean = true, delay: number = 480) => {
    const action = appAct.setLoader(active)

    if (active) {
      dispatch(action)
    } else {
      setTimeout(() => {
        dispatch(action)
      }, delay)
    }
  }, [])

  // __RETURN
  return useMemo(() => {
    return {
      isLoading: status,
      on: handleAction,
      off: (delay?: number) => handleAction(false, delay)
    }
  }, [status, handleAction])
}
