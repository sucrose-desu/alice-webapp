'use client'

import { useEffect } from 'react'

type Props = { error: Error & { digest?: string }; reset: () => void }

export default function Error({ error, reset }: Props) {
  // __EFFECT's
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  // __RENDER
  return (
    <div className='text-center p-8'>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
