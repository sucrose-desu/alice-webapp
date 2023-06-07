import { useCallback } from 'react'
import { utils } from '@/utils'

export default function LabsContainer() {
  // __STATE <React.Hooks>

  // __FUNCTION's
  const handleNotice = useCallback(() => {
    utils.notice.error({
      title: 'Title',
      content: 'Compiled successfully in 320ms'
    })
  }, [])

  // __EFFECT's

  // __RENDER
  return (
    <div className='ui--labs-container'>
      <div className='ui--labs-rows grid'>
        <button className='btn btn-primary' type='button' onClick={handleNotice}>
          <span className='text'>notice</span>
        </button>
      </div>
    </div>
  )
}
