import { useEffect, useState, useRef, useMemo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { isAfter } from 'date-fns'
import cls from 'classnames'

import type { Notice } from '@/types'
import { getCurrentContant } from './register'
import { SVG } from '@/components/svgs'

interface Props {
  record: Notice
  onRemove: (notice: Notice) => void
}

export function NoticeItem({ record, onRemove }: Props) {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(false)

  const path = useMemo(() => {
    switch (record.type) {
      case 'info':
        return (
          <>
            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
            <path d='m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z' />
          </>
        )

      case 'success':
        return (
          <>
            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
            <path d='M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z' />
          </>
        )

      case 'warn':
      case 'error':
        return (
          <>
            <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
            <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
          </>
        )
    }
  }, [record.type])

  // __EFFECT's
  useEffect(() => {
    setVisible(Boolean(record.visible))

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
    <CSSTransition nodeRef={nodeRef} in={visible} timeout={320} unmountOnExit onExited={() => onRemove(record)}>
      <div className='ui--notice-item' ref={nodeRef}>
        <div className={cls('ui--notice-type', record.type)}>
          <SVG>{path}</SVG>
        </div>

        <div className='ui--notice-content'>
          <h4 className='title'>{record.title}</h4>

          <div className='content'>{getCurrentContant(record)}</div>
        </div>

        <div className='ui--notice-close'>
          <button className='btn btn-close' title='Close' onClick={() => setVisible(false)}>
            <SVG className='bi bi-x-lg'>
              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
            </SVG>
          </button>
        </div>
      </div>
    </CSSTransition>
  )
}
