'use client'

import { useLoader } from '@/hooks'
import Link from 'next/link'
import { useCallback, useEffect } from 'react'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ThrowError({ error, reset }: Props) {
  // __STATE's
  const loader = useLoader()

  // __FUNCTION's
  const handleReset = useCallback(() => {
    loader.on()
    reset()

    setTimeout(loader.off, 256)
  }, [reset])

  // __EFFECT's
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  // __RENDER
  return (
    <div className='ui--page-error container mx-auto'>
      <div className='grid justify-center gap-1 pt-64 text-center'>
        <h1 className='mb-4 text-9xl font-extrabold'>Oops!</h1>
        <h3 className='text-3xl font-bold capitalize text-white/75'>unexpected error</h3>
        <p className='text-white/75'>An error occurred and you request couldn't be completed.</p>

        <div className='mt-8 flex justify-center gap-4'>
          <button className='btn h-7 rounded bg-white px-3 text-black hover:underline' onClick={handleReset}>
            <span className='font-semibold'>Try again</span>
          </button>

          <Link className='btn h-7 rounded text-white/75' href='/'>
            <span className='font-semibold underline'>Go back home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
