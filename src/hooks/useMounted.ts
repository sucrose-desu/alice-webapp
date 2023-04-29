import { EffectCallback, useEffect, useRef } from 'react'

export function useMounted(effect: EffectCallback) {
  // __STATE <React.Hooks>
  const nodeRef = useRef<boolean>(true)

  // __EFFECT's
  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current = false
      effect()
    }
  }, [])
}
