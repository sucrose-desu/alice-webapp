'use client'

import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import cls from 'classnames'

import type { Dialog } from '@/types/addon'

type Props = {
  data: Extract<Dialog, { type: 'modal' }>
  onRemove?: () => void
}

export function ModalComponent({ data, ...rest }: Props) {
  // __STATE's
  const nodeRef = useRef<HTMLDivElement>(null)
  const timeoutId = useRef<NodeJS.Timeout>()

  const [state, setState] = useState<boolean>(false)

  // __EFFECT's
  useEffect(() => {
    timeoutId.current = setTimeout(() => setState(data.visible), 32)
    return () => clearTimeout(timeoutId.current)
  }, [timeoutId, data.visible])

  // __RENDER
  return (
    <CSSTransition nodeRef={nodeRef} in={state} timeout={256} unmountOnExit={true} onExited={rest?.onRemove}>
      <div
        className={cls('ui--dialogs-context as-modal', data?.style?.align || 'center')}
        ref={nodeRef}
        data-vid={data.vid}
      >
        {typeof data.children === 'string' ? (
          <div className='_dangerously' dangerouslySetInnerHTML={{ __html: data.children }} />
        ) : (
          data.children
        )}
      </div>
    </CSSTransition>
  )
}
