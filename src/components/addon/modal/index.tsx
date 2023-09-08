'use client'

import { useCallback, useEffect, useRef } from 'react'
import cls from 'classnames'

import { useDispatch, useSelector } from '@/store'
import { setModal } from '@/store/app.store'
import { scrollOff } from '@/utils'
import { modal } from '@/utils/addon'

import { ModalItem } from './item'
import { getCurrentContant } from './register'

export default function ModalContainer() {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const modals = useSelector(({ app }) => app.modal)

  // __FUNCTION's
  const handleExited = useCallback((vid: string) => {
    dispatch(
      setModal({
        vid: `rm:${vid}`,
        visible: false,
        content: null
      })
    )
    scrollOff(false)
  }, [])

  // __EFFECT's
  useEffect(() => {
    function listener({ code }: KeyboardEvent) {
      if (modals && code === 'Escape') {
        const _modal = Object.values(modals).slice(-1)[0]
        if (_modal.allowEscape) modal.off(_modal.vid)
      }
    }

    if (modals && Object.keys(modals).length) {
      scrollOff(true)
      addEventListener('keydown', listener)
    } else {
      scrollOff(false)
      removeEventListener('keydown', listener)
    }

    return () => {
      removeEventListener('keydown', listener)
    }
  }, [modals])

  // __RENDER
  return (
    <div className={cls('ui--modal', { none: !modals })} ref={nodeRef}>
      {modals &&
        Object.values(modals).map((modal, index) => (
          <ModalItem
            key={modal.vid}
            index={index}
            className={modal.className}
            vid={modal.vid}
            visible={modal.visible}
            children={getCurrentContant(modal)}
            onExited={handleExited}
          />
        ))}
    </div>
  )
}
