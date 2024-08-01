'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'

import { dialog } from '@/components/addons'
import { useAuth } from '@/hooks'

import { SignInComponent } from '../modals/sign-in'
import { SVG } from '../svg'

export function UserComponent() {
  // __STATE's
  const user = useAuth()

  // __FUNCTION's
  const handleSignIn = useCallback(() => {
    dialog.modal(<SignInComponent />, {
      name: 'sign-in',
      allowEscape: true,
      style: { align: 'start' }
    })
  }, [])

  // __RENDER
  return (
    <div className='ui--navigator-user rounded-lg bg-black/40'>
      {!user.isAuth() ? (
        <Link className='btn btn-user' href='/account' key='.account'>
          <Image
            className='image'
            width={36}
            height={36}
            src='/static/images/Jinx.gif'
            loading='eager'
            quality={100}
            priority
            alt='User Avatar'
            unoptimized
          />

          <div className='text-left leading-tight max-sm:hidden'>
            <h4 className='text-sm font-normal capitalize leading-4 text-neutral-300'>display name</h4>
            <i className='text-xs lowercase text-neutral-500'>user@alice.live</i>
          </div>
        </Link>
      ) : (
        <button className='btn btn-auth' onClick={handleSignIn}>
          <SVG className='bi-person-fill aspect-square w-6' key='person-fill'>
            <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
          </SVG>
        </button>
      )}
    </div>
  )
}
