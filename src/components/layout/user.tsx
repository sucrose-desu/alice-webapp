'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from '@/hooks'
import { dialog } from '@/utils/addon'

import { SVG } from '../svg'
import { LoginComponent } from '../modals/login'

export function UserComponent() {
  // __STATE's
  const user = useAuth()

  // __RENDER
  return (
    <div className='ui--navigator-user rounded-lg bg-black/40'>
      {user.isAuth() ? (
        <Link className='btn btn-user' href='/my'>
          <Image
            className='image'
            width={36}
            height={36}
            src='/static/images/default-avatar.png'
            loading='eager'
            quality={100}
            priority
            alt='User Avatar'
          />

          <div className='text-left leading-tight max-sm:hidden'>
            <h4 className='text-sm font-normal capitalize leading-4 text-neutral-300'>{user.displayName}</h4>
            <i className='text-xs lowercase text-neutral-500'>{user.email}</i>
          </div>
        </Link>
      ) : (
        <button
          className='btn btn-auth'
          onClick={() =>
            dialog.modal(<LoginComponent />, { name: 'sign-in', allowEscape: true, style: { align: 'start' } })
          }
        >
          <SVG className='bi-person-fill aspect-square w-6' key='person-fill'>
            <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
          </SVG>
        </button>
      )}
    </div>
  )
}
