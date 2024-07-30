'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import { isAfter } from 'date-fns'
import cls from 'classnames'

import type { Toast } from './toast.type'

type Props = {
  record: Toast
  onRemove?: (toast: Toast) => void
}

export function ToastItem({ record, ...rest }: Props) {
  // __STATE's
  const nodeRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(false)

  // __FUNCTION's
  const handleClose = useCallback(() => {
    if (rest?.onRemove) {
      rest.onRemove(record)
    }
  }, [record, rest])

  // __EFFECT's
  useEffect(() => {
    setVisible(record.visible)

    let intervalId: NodeJS.Timeout
    if (record.duration) {
      const duration = record.duration
      intervalId = setInterval(() => {
        if (isAfter(Date.now(), duration)) {
          clearInterval(intervalId)
          setVisible(false)
        }
      }, 250)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [record])

  // __RENDER
  return (
    <CSSTransition nodeRef={nodeRef} in={visible} timeout={160} unmountOnExit onExited={handleClose}>
      <div className='ui--toast-item' ref={nodeRef} onClick={handleClose}>
        <p className='px-6 py-2'>{record.children}</p>
      </div>
    </CSSTransition>
  )
}
