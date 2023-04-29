import { useMemo, useEffect, useState, useRef, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import type { Notice } from '@/types'
import { getCurrentContant } from './register'
import cls from 'classnames'

export interface Props {
  record: Notice
  onRemove: (notice: Notice) => void
}

export function NoticeItem({ record, onRemove }: Props) {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLDivElement>(null)
  const duration = useMemo(() => record.duration, [])
  const [visible, setVisible] = useState<boolean>(false)

  // __EFFECT's
  useEffect(() => {
    if (record.visible) {
      setTimeout(() => setVisible(true), 128)
    } else {
      setVisible(false)
    }
  }, [record])

  useEffect(() => {
    if (duration) {
      const timeoutId = setTimeout(() => setVisible(false), duration + 320)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [duration])

  // __RENDER
  return (
    <CSSTransition nodeRef={nodeRef} in={visible} timeout={320} unmountOnExit onExited={() => onRemove(record)}>
      <div className='ui--notice-item' ref={nodeRef}>
        <div className={cls('ui--notice-type', record.type)}></div>

        <div className='ui--notice-content'>
          <h4 className='title'>{record.title}</h4>
          <div className='content'>{getCurrentContant(record)}</div>
        </div>

        <div className='ui--notice-close'>
          <button className='btn btn-close' title='Close.' onClick={() => setVisible(false)}>
            <svg className='icon' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
              <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
            </svg>
          </button>
        </div>
      </div>
    </CSSTransition>
  )
}
