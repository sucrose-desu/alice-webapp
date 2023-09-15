import { ContextComponent } from './context'
import '@/styles/pages/labs.scss'

export default function LabsContainer() {
  // __STATE<React.Hooks>

  // __FUNCTION's

  // __EFFECT's

  // __RENDER
  return (
    <div className='ui--labs-container'>
      <div className='grid gap-5 mb-6'>
        <p className='italic'>.ui--labs-container</p>
      </div>

      <ContextComponent />
    </div>
  )
}
