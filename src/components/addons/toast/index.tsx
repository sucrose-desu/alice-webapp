'use client'

import { useCallback } from 'react'
import cls from 'classnames'

import { useDispatch, useSelector } from '@/store'

import { addonAct } from '../addons.store'
import { ToastItem } from './item'
import type { Toast } from './toast.type'

import './style.scss'

export function ToastObserver() {
  // __STATE's
  const dispatch = useDispatch()
  const toasts = useSelector(({ addons }) => addons.toasts)

  // __FUNCTION's
  const handleRemove = useCallback((toast: Toast) => {
    const action = addonAct.setToast({
      ...toast,
      vid: `rm:${toast.vid}`,
      visible: false
    })

    dispatch(action)
  }, [])

  // __RENDER
  if (!toasts.length) return null
  return (
    <div className={cls('ui--toast-wrapper', { active: toasts.length })}>
      {toasts.map((record) => (
        <ToastItem key={record.vid} record={record} onRemove={handleRemove} />
      ))}
    </div>
  )
}
