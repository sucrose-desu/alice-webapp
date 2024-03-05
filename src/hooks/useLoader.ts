import { useCallback, useMemo } from 'react'
import { dispatch } from '@/store'
import { appAct } from '@/store/app.store'

export function useLoader() {
  // __FUNCTION's
  const handleAction = useCallback((active: boolean, delay: number = 512) => {
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
      on: () => handleAction(true),
      off: (delay?: number) => handleAction(false, delay)
    }
  }, [handleAction])
}
