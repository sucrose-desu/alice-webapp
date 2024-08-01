import { SignInComponent } from '@/components/modals/sign-in'

export default function SignInContainer() {
  // __STATE's'

  // __RENDER
  return (
    <div className='ui--guard-container' aria-label='SignIn'>
      <div className='grid justify-center rounded-xl bg-neutral-900/0 px-2 py-12'>
        <SignInComponent />
      </div>
    </div>
  )
}
