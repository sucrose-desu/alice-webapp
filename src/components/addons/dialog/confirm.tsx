'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import cls from 'classnames'

import type { Dialog } from './dialog.type'

type Props = {
  data: Extract<Dialog, { type: 'confirm' }>
  onClose?: () => void
  onRemove?: () => void
}

export function ConfirmComponent({ data, ...rest }: Props) {
  // __STATE's
  const nodeRef = useRef<HTMLDivElement>(null)
  const timeoutId = useRef<NodeJS.Timeout>()

  const [currentInput, setCurrentInput] = useState<string>()
  const [state, setState] = useState<boolean>(false)

  // __FUNCTION's
  const handleConfirm = useCallback(() => {
    if (rest?.onClose) rest.onClose()
    data.resolve({
      isConfirmed: true,
      isDenied: false,
      value: currentInput
    })
  }, [data, rest, currentInput])

  const handleCancel = useCallback(() => {
    if (rest?.onClose) rest.onClose()
    data.resolve({
      isConfirmed: false,
      isDenied: true
    })
  }, [data, rest])

  // __EFFECT's
  useEffect(() => {
    timeoutId.current = setTimeout(() => setState(data.visible), 32)
    return () => clearTimeout(timeoutId.current)
  }, [timeoutId, data.visible])

  // __RENDER
  return (
    <CSSTransition nodeRef={nodeRef} in={state} timeout={128} unmountOnExit={true} onExited={rest?.onRemove}>
      <div className='ui--dialogs-context as-confirm' ref={nodeRef}>
        <div className='ui--dialogs-confirm as-header'>
          <h4 className='h4 font-bold italic'>{data?.title || 'System Alert'}</h4>
        </div>

        <div className='ui--dialogs-confirm as-body'>
          {typeof data.children === 'string' ? (
            <div className='_dangerously' dangerouslySetInnerHTML={{ __html: data.children }} />
          ) : (
            data.children
          )}

          {data?.useInput && (
            <input
              className='input'
              defaultValue={currentInput}
              onChange={({ target }) => setCurrentInput(target.value)}
            />
          )}
        </div>

        <div className='ui--dialogs-confirm as-footer'>
          <button className='btn btn-cancel' onClick={handleCancel}>
            <span className='capitalize'>{data?.btnCancel || 'cancel'}</span>
          </button>

          <button className='btn btn-confirm' autoFocus onClick={handleConfirm}>
            <span className='font-bold capitalize'>{data?.btnConfirm || 'confirm'}</span>
          </button>
        </div>
      </div>
    </CSSTransition>
  )
}
