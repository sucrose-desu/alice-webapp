'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSelector } from '@/store'
import cls from 'classnames'

export default function LoaderProvider() {
  // __STATE <React.Hooks>
  const state = useSelector(({ app }) => app.loader)
  const [visible, setVisible] = useState<boolean>(false)

  // __FUNCTION's
  const breakAllKeyboardEvents = useCallback((e: KeyboardEvent) => {
    e.preventDefault()
  }, [])

  // __EFFECT's
  useEffect(() => {
    if (state) {
      setVisible(true)
      addEventListener('keydown', breakAllKeyboardEvents)
    } else {
      setTimeout(() => setVisible(false), 320)
      removeEventListener('keydown', breakAllKeyboardEvents)
    }

    return () => {
      removeEventListener('keydown', breakAllKeyboardEvents)
    }
  }, [state])

  // __RENDER
  if (!visible) return null
  return (
    <div className='ui--loader'>
      <div className={cls('ui--loader-progress', { done: !state })}>
        <div className='ui--loader-rainbow'></div>
      </div>
    </div>
  )
}
