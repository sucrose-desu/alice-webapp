import Image from 'next/image'
import { useCallback } from 'react'
import { useAuth, useModal } from '@/hooks'

import { Link } from '../link'
import { SVG } from '../svgs'
import { LoginComponent } from '../modals/login'

export function UserComponent() {
  // __STATE <React.Hooks>
  const user = useAuth()
  const modal = useModal({ className: 'md-login' })

  // __FUNCTION's
  const handleLogin = useCallback(() => {
    if (!user.isAuth()) {
      modal.on(<LoginComponent />, { allowEscape: true })
    }
  }, [user])

  // __RENDER
  return (
    <div className='ui--navigator-user' suppressHydrationWarning>
      {user.isAuth() ? (
        <Link className='btn btn-user' to='/user'>
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

          <div className='info'>
            <h4 className='name'>{user.displayName}</h4>
            <i className='desc'>{user.email}</i>
          </div>
        </Link>
      ) : (
        <button className='btn btn-auth' onClick={handleLogin}>
          <SVG className='bi-person-fill' key='person-fill'>
            <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
          </SVG>
        </button>
      )}
    </div>
  )
}
