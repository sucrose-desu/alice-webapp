'use client'

import { useCallback, useMemo } from 'react'
import cls from 'classnames'

import { useDispatch } from '@/store'

import { addonAct } from '../addons.store'
import { AlertComponent } from './alert'
import { ConfirmComponent } from './confirm'
import { ModalComponent } from './modal'
import type { Dialog } from './dialog.type'

type Props = {
  dialog: Dialog
  index: number
}

export function DialogContext({ dialog, index }: Props) {
  // __STATE's
  const dispatch = useDispatch()

  // __FUNCTION's
  const handleClose = useCallback(() => {
    const payload = { ...dialog, visible: false }
    dispatch(addonAct.setDialog(payload))
  }, [window])

  const handleRemove = useCallback(() => {
    const payload = { ...dialog, vid: `rm:${dialog.vid}` }
    dispatch(addonAct.setDialog(payload))
  }, [window])

  // __RENDER
  switch (dialog.type) {
    case 'alert':
      return <AlertComponent key={index} data={dialog} onClose={handleClose} onRemove={handleRemove} />

    case 'confirm':
      return <ConfirmComponent key={index} data={dialog} onClose={handleClose} onRemove={handleRemove} />

    case 'modal':
      return <ModalComponent key={index} data={dialog} onRemove={handleRemove} />

    default:
      return <div className='ui--dialogs-context as-default place-self-center bg-white p-4 text-black'>Context</div>
  }
}
