'use client'

import { useCallback } from 'react'

import { Genre } from '@/constants/genre'
import { useLoader, useMounted } from '@/hooks'
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

  // __EFFECT's
  useMounted(() => {
    console.log(Genre.getList())
  })

  // __RENDER
  return (
    <div className='grid grid-flow-col justify-start gap-5'>
      <button className='btn btn-primary h-10 px-8' type='button' onClick={handleLoader}>
        <span className='text capitalize'>use loader</span>
      </button>

      <button className='btn btn-primary h-10 px-8' type='button' onClick={handleNotice}>
        <span className='text capitalize'>use notice</span>
      </button>

      <button className='btn btn-primary h-10 px-8' type='button' onClick={handleModal}>
        <span className='text capitalize'>use modal</span>
      </button>
    </div>
  )
}
