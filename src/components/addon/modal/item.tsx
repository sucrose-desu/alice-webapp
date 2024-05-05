'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import cls from 'classnames'

type Props = {
  index: number
  className?: string
  vid: string
  visible: boolean
  children: ReactNode
  onExited?: (vid: string) => void
}

export function ModalItem({ vid, index, visible, className, children, ...rest }: Props) {
  // __STATE's
  const nodeRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState(false)

  // __EFFECT's
  useEffect(() => {
    setTimeout(() => setState(visible), 64)
  }, [visible])

  // __RENDER
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={state}
      timeout={320}
      unmountOnExit
      onExited={() => rest?.onExited && rest.onExited(vid)}
    >
      <div className={cls('ui--modal-wrapper', 'is-default', className)} style={{ zIndex: 40 + index }} ref={nodeRef}>
        <div className='ui--modal-container' data-vid={vid}>
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}
