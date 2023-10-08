import Image from 'next/image'
import Link from 'next/link'

import { useAuth } from '@/hooks'
import { modal } from '@/utils/addon'

import { SVG } from '../svgs'
import { LoginComponent } from '../modals/login'

export function UserComponent() {
  // __STATE<React.Hooks>
  const user = useAuth()

  // __RENDER
  return (
    <div className='ui--navigator-user rounded-lg bg-black/40' suppressHydrationWarning>
      {user.isAuth() ? (
        <Link className='btn btn-user' href='/account'>
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

          <div className='text-left leading-tight'>
            <h4 className='text-sm font-normal capitalize leading-4 text-zinc-300'>{user.displayName}</h4>
            <i className='text-xs lowercase text-zinc-400'>{user.email}</i>
          </div>
        </Link>
      ) : (
        <button className='btn btn-auth' onClick={() => modal.on(<LoginComponent />, { className: 'md-login' })}>
          <SVG className='bi-person-fill aspect-square w-6' key='person-fill'>
            <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
          </SVG>
        </button>
      )}
    </div>
  )
}
