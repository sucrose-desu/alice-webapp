'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { appAct } from '@/store/app.store'
import { scrollOff } from '@/utils'
import { useDispatch, useSelector } from '@/store'
import type { Dialog } from '@/types/addon'

import { getCurrentContant } from './register'

export default function DialogContainer() {
  // __STATE's
  const dispatch = useDispatch()
  const state = useSelector(({ app }) => app.dialog)

  const nodeRef = useRef<HTMLDivElement>(null)
  const btnConfirm = useRef<HTMLButtonElement>(null)
  const useConfirm = useMemo(() => state?.type === 'confirm', [state?.type])

  // __FUNCTION's
  const handleClose = useCallback(
    (value: boolean = true) => {
      if (!state) return void 0
      if (state?.resolve) {
        state.resolve({
          isConfirmed: value,
          isDenied: !value
        })
      }

      const payload: Dialog = {
        ...state,
        visible: false,
        resolve: void 0
      }

      dispatch(appAct.setDialog(payload))
    },
    [state, dispatch]
  )

  const handleOnExited = useCallback(() => {
    dispatch(appAct.setDialog({ visible: false, content: null }))
    scrollOff(false)
  }, [dispatch])

  // __EFFECT's
  useEffect(() => {
    function listener({ code }: KeyboardEvent) {
      switch (code) {
        case 'Enter' || 'Space':
          handleClose()
          break

        case 'Escape':
          handleClose(false)
          break
      }
    }

    if (state?.visible) {
      addEventListener('keydown', listener)
      if (btnConfirm.current) btnConfirm.current.focus()
    } else {
      removeEventListener('keydown', listener)
    }

    return () => {
      removeEventListener('keydown', listener)
    }
  }, [state, btnConfirm])

  // __RENDER
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={state?.visible}
      timeout={128}
      unmountOnExit={true}
      onEnter={() => scrollOff(true)}
      onExited={handleOnExited}
    >
      <div className='ui--modal-wrapper is-dialog' ref={nodeRef}>
        <div className='ui--modal-container'>
          <div className='ui--modal-header'>
            <div className='title'>{state?.title || 'System Alert'}</div>

            <button className='btn btn-close' title='Close.' onClick={() => handleClose(false)}>
              <span className='icon bi bi-x-lg'></span>
            </button>
          </div>

          <div className='ui--modal-boby'>{state && getCurrentContant(state)}</div>

          <div className='ui--modal-footer'>
            {useConfirm && (
              <button className='btn btn-overlay btn-close' onClick={() => handleClose(false)}>
                <span className='text'>{state?.cancelLabel}</span>
              </button>
            )}

            <button className='btn btn-primary btn-confirm' ref={btnConfirm} onClick={() => handleClose()}>
              <span className='text'>{state?.confirmLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
