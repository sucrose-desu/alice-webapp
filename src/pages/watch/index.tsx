import { useEffect, useRef } from 'react'
import { fetchTrack } from '@/features/watch'
import { useMounted } from '@/hooks'

interface Props {
  data?: any
}

export default function WatchContainer({ data }: Props) {
  // __STATE <React.Hooks>

  // __FUNCTION's

  // __EFFECT's
  useMounted(() => {
    console.log(data)
  })

  // __RENDER
  return (
    <div className='ui--watch-container'>
      <i>.ui--watch</i>
    </div>
  )
}

export const getServerSideProps = fetchTrack
