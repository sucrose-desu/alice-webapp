'use client'

import { useCallback } from 'react'

import { appAct } from '@/store/app.store'
import { useDispatch, useSelector } from '@/store'
import type { Notice } from '@/types/addon'

import { NoticeItem } from './item'

export function NoticeObserver() {
  // __STATE's
  const dispatch = useDispatch()
  const notices = useSelector(({ app }) => app.notices)

  // __FUNCTION's
  const handleRemove = useCallback((notice: Notice) => {
    const payload: Notice = {
      ...notice,
      vid: `rm:${notice.vid}`,
      visible: false
    }

    dispatch(appAct.setNotice(payload))
  }, [])

  // __RENDER
  if (!notices) return null
  return (
    <div className='ui--notice pointer-events-none fixed right-8 top-8'>
      {notices.map((record, index) => (
        <NoticeItem key={index} record={record} onRemove={handleRemove} />
      ))}
    </div>
  )
}
