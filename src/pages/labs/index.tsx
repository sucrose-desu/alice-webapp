import { useCallback } from 'react'
import { utils } from '@/utils'
import { useLoader } from '@/hooks'

export default function LabsContainer() {
  // __STATE <React.Hooks>
  const loader = useLoader()

  // __FUNCTION's
  const handleLoader = useCallback(() => {
    loader.on()
  }, [])

  const handleNotice = useCallback(() => {
    utils.notice.error('Compiled successfully in 320ms')
  }, [])

  // __EFFECT's

  // __RENDER
  return (
    <div className='ui--labs-container'>
      <div className='ui--labs-rows grid'>
        <button className='btn btn-primary' type='button' onClick={handleLoader}>
          <span className='text'>loader</span>
        </button>

        <button className='btn btn-primary' type='button' onClick={handleNotice}>
          <span className='text'>notice</span>
        </button>
      </div>
    </div>
  )
}
