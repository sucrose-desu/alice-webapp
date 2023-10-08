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
    <div className='ui--loader fixed inset-0 z-[992]'>
      <div
        className={cls(
          'ui--loader-progress animate-loader pointer-events-none h-[2px] max-w-[98%]',
          'before:absolute before:inset-x-0 before:bottom-auto before:top-0 before:h-[2px] before:bg-white/20 before:content-[""]',
          !state && 'max-w-full animate-none'
        )}
      >
        <div className='ui--loader-rainbow bg-theme animate-rainbow relative h-full bg-[length:200%]'></div>
      </div>
    </div>
  )
}
