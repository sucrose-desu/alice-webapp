// import '@/styles/pages/guard.scss'

import { LoginComponent } from '@/components/modals/login'

export default function SignInContainer() {
  // __STATE<Next.14>

  // __RENDER
  return (
    <div className='ui--guard-container' aria-label='SignIn'>
      <div className='grid justify-center rounded-xl bg-neutral-900/0 px-2 py-12'>
        <LoginComponent />
      </div>
    </div>
  )
}
