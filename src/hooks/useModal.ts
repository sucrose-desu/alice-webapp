import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setModal } from '@/store/app.store'
import { generateId, modal } from '@/utils'
import { ModalContent, ModalOptions } from '@/types'

interface CallbackInterface {
  /**
   * Open modal
   *
   * @param {ModalChild} children
   * @param {ModalOptions} options
   */
  on: (children: ModalContent, options?: ModalOptions) => void

  /**
   * Close modal
   */
  off: () => void
}

export function useModal(options?: ModalOptions): CallbackInterface {
  // __STATE <React.Hooks>
  const dispatch = useDispatch()
  const vid = useMemo(() => options?.className || generateId(), [options])

  // __FUNCTION's
  const on = useCallback(
    (content: ModalContent) => {
      const action = setModal({
        vid,
        visible: true,
        className: options?.className,
        allowEscape: options?.allowEscape || true,
        content
      })

      dispatch(action)
    },
    [vid, options]
  )

  const off = useCallback(() => modal.off(vid), [vid])

  // __RETURN
  return useMemo(() => ({ on, off }), [on, off])
}
