'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { isAfter } from 'date-fns'
import cls from 'classnames'

import type { Notice } from './notice.type'

type Props = {
  record: Notice
  onRemove?: (notice: Notice) => void
}

export function NoticeItem({ record, ...rest }: Props) {
  // __STATE's
  const nodeRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(false)

  const icon = useMemo(() => {
    switch (record.type) {
      case 'info':
        return 'bi-info-circle'

      case 'success':
        return 'bi-check-circle'

      case 'warn':
        return 'bi-exclamation-circle'

      case 'error':
        return 'bi-x-circle'
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
    <CSSTransition
      nodeRef={nodeRef}
      in={visible}
      timeout={320}
      unmountOnExit
      onExited={() => rest?.onRemove && rest.onRemove(record)}
    >
      <div className='ui--notice-item' ref={nodeRef}>
        <div className={cls('ui--notice-type', 'grid items-start justify-center py-3', record.type)}>
          <span className={cls('icon bi text-xl', icon)} />
        </div>

        <div className='ui--notice-content py-3 pl-4 pr-9'>
          <h4 className='text-sm font-bold'>{record.title}</h4>
          <div className='mt-1 text-xs text-neutral-400'>
            {typeof record.children === 'string' ? (
              <div className='_dangerously' dangerouslySetInnerHTML={{ __html: record.children }} />
            ) : (
              record.children
            )}
          </div>
        </div>

        <div className='ui--notice-close absolute right-0 top-0 z-[1] pr-1 pt-1'>
          <button
            className='btn size-7 p-0 text-neutral-400 hover:text-rose-600'
            type='button'
            title='Close'
            onClick={() => setVisible(false)}
          >
            <span className='bi bi-x text-xl' />
          </button>
        </div>
      </div>
    </CSSTransition>
  )
}
