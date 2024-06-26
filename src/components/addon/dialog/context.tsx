'use client'

import { useCallback, useMemo } from 'react'
import cls from 'classnames'

import { useDispatch } from '@/store'
import { appAct } from '@/store/app.store'
import type { Dialog } from '@/types/addon'

import { AlertComponent } from './alert'
import { ConfirmComponent } from './confirm'
import { ModalComponent } from './modal'

type Props = {
  dialog: Dialog
  index: number
}

export function DialogContext({ dialog, index }: Props) {
  // __STATE's
  const dispatch = useDispatch()
  const zIndex = useMemo(() => index * 10 + 10, [index])

  // __FUNCTION's
  const handleClose = useCallback(() => {
    const payload = { ...dialog, visible: false }
    dispatch(appAct.setDialog(payload))
  }, [window])

  const handleRemove = useCallback(() => {
    const payload = { ...dialog, vid: `rm:${dialog.vid}` }
    dispatch(appAct.setDialog(payload))
  }, [window])

  // __RENDER
  switch (dialog.type) {
    case 'alert':
      return <AlertComponent key={zIndex} data={dialog} zIndex={zIndex} onClose={handleClose} onRemove={handleRemove} />

    case 'confirm':
      return (
        <ConfirmComponent key={zIndex} data={dialog} zIndex={zIndex} onClose={handleClose} onRemove={handleRemove} />
      )

    case 'modal':
      return <ModalComponent key={zIndex} data={dialog} zIndex={zIndex} onRemove={handleRemove} />

    default:
      return <div className='ui--dialogs-context as-default place-self-center bg-white p-4 text-black'>Context</div>
  }
}
