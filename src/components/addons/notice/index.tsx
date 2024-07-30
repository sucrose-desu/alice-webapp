'use client'

import { useCallback } from 'react'
import cls from 'classnames'

import { useDispatch, useSelector } from '@/store'

import { addonAct } from '../addons.store'
import { NoticeItem } from './item'
import type { Notice } from './notice.type'

import './style.scss'

export function NoticeObserver() {
  // __STATE's
  const dispatch = useDispatch()
  const notices = useSelector(({ addons }) => addons.notices)

  // __FUNCTION's
  const handleRemove = useCallback((notice: Notice) => {
    const action = addonAct.setNotice({
      ...notice,
      vid: `rm:${notice.vid}`,
      visible: false
    })

    dispatch(action)
  }, [])

  // __RENDER
  if (!notices) return null
  return (
    <div className={cls('ui--notice-wrapper', { active: notices.length })}>
      {notices.map((record) => (
        <NoticeItem key={record.vid} record={record} onRemove={handleRemove} />
      ))}
    </div>
  )
}
