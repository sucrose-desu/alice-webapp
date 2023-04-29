import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import type { StoreTypes } from '@/store'
import cls from 'classnames'

export default function LoaderContainer() {
  // __STATE <React.Hooks>
  const loader = useSelector(({ app }: StoreTypes) => app.loader)
  const [visible, setVisible] = useState<boolean>(false)

  // __FUNCTION's
  const breakAllKeyboardEvents = useCallback((e: KeyboardEvent) => {
    e.preventDefault()
  }, [])

  // __EFFECT's
  useEffect(() => {
    if (loader) {
      setVisible(true)
      addEventListener('keydown', breakAllKeyboardEvents)
    } else {
      setTimeout(() => setVisible(false), 320)
      removeEventListener('keydown', breakAllKeyboardEvents)
    }
  }, [loader])

  // __RENDER
  if (!visible) return null
  return (
    <div className='ui--loader'>
      <div className={cls('ui--loader-progress', { done: !loader })}></div>
    </div>
  )
}
