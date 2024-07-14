'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import cls from 'classnames'

import type { Dialog } from '@/types/addon'

type Props = {
  data: Extract<Dialog, { type: 'alert' }>
  onClose?: () => void
  onRemove?: () => void
}

export function AlertComponent({ data, ...rest }: Props) {
  // __STATE's
  const nodeRef = useRef<HTMLDivElement>(null)
  const timeoutId = useRef<NodeJS.Timeout>()

  const [state, setState] = useState<boolean>(false)

  // __FUNCTION's
  const handleClose = useCallback(() => {
    if (rest?.onClose) rest.onClose()
    if (data?.resolve) data.resolve()
  }, [data, rest])

  // __EFFECT's
  useEffect(() => {
    timeoutId.current = setTimeout(() => setState(data.visible), 32)
    return () => clearTimeout(timeoutId.current)
  }, [timeoutId, data.visible])

  // __RENDER
  return (
    <CSSTransition nodeRef={nodeRef} in={state} timeout={128} unmountOnExit={true} onExited={rest?.onRemove}>
      <div className='ui--dialogs-context as-alert' ref={nodeRef}>
        <div className='ui--dialogs-alert as-header'>
          <h4 className='h4 font-bold italic'>{data?.title || 'System Alert'}</h4>
        </div>

        <div className='ui--dialogs-alert as-body'>
          {typeof data.children === 'string' ? (
            <div className='_dangerously' dangerouslySetInnerHTML={{ __html: data.children }} />
          ) : (
            data.children
          )}
        </div>

        <div className='ui--dialogs-alert as-footer'>
          <button className='btn btn-ok' autoFocus onClick={handleClose}>
            <span className='font-bold uppercase'>ok</span>
          </button>
        </div>
      </div>
    </CSSTransition>
  )
}
