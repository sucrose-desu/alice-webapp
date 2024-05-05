'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { modal } from '@/utils/addon'

interface Props {
  title: string
  children: ReactNode
}

export function ModalComponent({ title, children }: Props) {
  // __STATE's
  const nodeRef = useRef<HTMLDivElement>(null)
  const [vid, setVid] = useState<string>('')

  // __EFFECT's
  useEffect(() => {
    if (nodeRef.current) {
      const target = nodeRef.current.parentElement!
      setVid(target.dataset.vid!)
    }
  }, [nodeRef])

  // __RENDER
  return (
    <>
      <div className='ui--modal-header' ref={nodeRef}>
        <div className='title'>{title}</div>

        <button className='btn btn-close' title='Close.' onClick={() => modal.off(vid)}>
          <span className='icon bi bi-x-lg'></span>
        </button>
      </div>

      {children}
    </>
  )
}
