'use client'

import { useCallback } from 'react'
import { useLoader } from '@/hooks'
import { modal, notice } from '@/utils/addon'

export function ContextComponent() {
  // __STATE<React.Hooks>
  const loader = useLoader()

  // __FUNCTION's
  const handleLoader = useCallback(() => {
    loader.on()
    loader.off(2e3)
  }, [])

  const handleNotice = useCallback(() => {
    notice.success('Generate Lorem Ipsum placeholder text.', { title: 'Successful' })
  }, [])

  const handleModal = useCallback(() => {
    modal.on('Generate Lorem Ipsum placeholder text.')
  }, [])

  // __RENDER
  return (
    <div className='grid gap-5 grid-flow-col justify-start'>
      <button className='btn btn-primary' type='button' onClick={handleLoader}>
        <span className='text capitalize'>use loader</span>
      </button>

      <button className='btn btn-primary' type='button' onClick={handleNotice}>
        <span className='text capitalize'>use notice</span>
      </button>

      <button className='btn btn-primary' type='button' onClick={handleModal}>
        <span className='text capitalize'>use modal</span>
      </button>
    </div>
  )
}
