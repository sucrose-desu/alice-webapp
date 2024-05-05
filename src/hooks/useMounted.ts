import { useEffect, useRef } from 'react'
import type { EffectCallback } from 'react'

export function useMounted(effect: EffectCallback) {
  // __STATE's
  const nodeRef = useRef<boolean>(true)

  // __EFFECT's
  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current = false
      effect()
    }
  }, [])
}
