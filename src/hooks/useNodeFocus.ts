import { RefObject, useEffect } from 'react'

export function useNodeFocus<E = HTMLElement>(nodeRef: RefObject<E>, deps?: number | boolean) {
  // __EFFECT's
  useEffect(() => {
    const { current: element } = nodeRef
    if (element) {
      ;(element as any).focus()
    }
  }, [nodeRef])
}
