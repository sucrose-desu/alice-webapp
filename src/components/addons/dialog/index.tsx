'use client'

import { useCallback, useEffect, useRef } from 'react'
import cls from 'classnames'

import { useDispatch, useSelector } from '@/store'
import { scrollOff } from '@/utils'

import { addonAct } from '../addons.store'
import { DialogContext } from './context'

import './style.scss'

export function DialogObserver() {
  // __STATE's
  const nodeRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const dialogs = useSelector(({ addons }) => addons.dialogs)

  // __FUNCTION's
  const handleListener = useCallback(
    ({ code }: KeyboardEvent) => {
      if (code.toLowerCase() === 'escape') {
        const latest = dialogs.filter((dialog) => dialog?.allowEscape).slice(-1)[0]
        if (latest) {
          const payload = { ...latest, visible: false }
          dispatch(addonAct.setDialog(payload))
        }
      }
    },
    [dialogs]
  )

  // __EFFECT's
  useEffect(() => {
    if (dialogs.length) {
      scrollOff(true)
      addEventListener('keydown', handleListener, true)
    } else {
      scrollOff(false)
      removeEventListener('keydown', handleListener, true)
    }

    return () => {
      removeEventListener('keydown', handleListener, true)
    }
  }, [handleListener])

  // __RENDER
  return (
    <div className={cls('ui--dialogs-wrapper', { active: dialogs.length })} ref={nodeRef}>
      <div className='ui--dialogs-backdrop' />

      {dialogs.map((dialog, index) => (
        <div className='ui--dialogs-list' style={{ zIndex: index * 10 + 10 }} key={dialog.vid}>
          <DialogContext dialog={dialog} index={index} key={index} />
        </div>
      ))}
    </div>
  )
}
