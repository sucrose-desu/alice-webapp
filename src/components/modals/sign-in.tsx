'use client'

import cls from 'classnames'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useEffectOnce } from 'react-use'

import { AuthService } from '@/services'

import { FormSignInComponent } from '../forms/sign-in'

type Props = {
  className?: string
}

export function SignInComponent({ className }: Props) {
  // __STATE's
  const router = useRouter()

  // __FUNCTION's
  const handleCallback = useCallback((to?: string) => {
    if (to) router.push(to)
  }, [])

  // __EFFECT's
  useEffectOnce(() => {
    AuthService.signOut()
  })

  // __RENDER
  return (
    <div className={cls('ui--login-modal relative', className)}>
      <div className='ui--login-header'>
        <h2 className='capitalize leading-6'>system sign-in</h2>
        <p className='desc text-xs italic text-neutral-400'>Generate Lorem Ipsum placeholder text.</p>
      </div>

      <FormSignInComponent onCallback={handleCallback} />

      <div className='ui--login-footer border-0 border-t border-solid border-neutral-900 pt-4 text-center'>
        <p className='italic text-neutral-400'>or Sign-In with</p>

        <div className='mb-6 mt-4 grid grid-flow-col justify-center gap-4'>
          <button className='btn btn-addon'>
            <span className='icon bi bi-github text-xl' />
          </button>

          <button className='btn btn-addon'>
            <span className='icon bi bi-discord text-xl' />
          </button>

          <button className='btn btn-addon'>
            <span className='icon bi bi-twitter-x text-lg' />
          </button>
        </div>

        <i className='block text-center capitalize text-neutral-500'>close [ESC]</i>
      </div>
    </div>
  )
}
