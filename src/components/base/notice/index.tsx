import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setNotice } from '@/store/app.store'
import type { StoreTypes } from '@/store'
import type { Notice } from '@/types'

import { NoticeItem } from './item'

export default function NoticeContainer() {
  // __STATE <React.Hooks>
  const dispatch = useDispatch()
  const notices = useSelector(({ app }: StoreTypes) => app.notice)

  // __FUNCTION's
  const handleRemove = useCallback((notice: Notice) => {
    const payload: Notice = {
      ...notice,
      name: `rm:${notice.name}`,
      visible: false
    }

    dispatch(setNotice(payload))
  }, [])

  // __RENDER
  return (
    <div className='ui--notice'>
      {notices.map((record, index) => (
        <NoticeItem key={index} record={record} onRemove={handleRemove} />
      ))}
    </div>
  )
}
