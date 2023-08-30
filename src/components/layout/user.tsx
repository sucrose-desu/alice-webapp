import Image from 'next/image'
import Link from 'next/link'

import { SVG } from '../svgs'

export function UserComponent() {
  // __RENDER
  return (
    <div className='ui--navigator-user' suppressHydrationWarning>
      {true ? (
        <Link className='btn btn-user' href='/user'>
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

          <div>
            <h4 className='capitalize font-normal text-sm text-zinc-300'>Display Name</h4>
            <i className='lowercase text-xs text-zinc-400'>example@email.com</i>
          </div>
        </Link>
      ) : (
        <button className='btn btn-auth'>
          <SVG className='bi-person-fill' key='person-fill'>
            <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
          </SVG>
        </button>
      )}
    </div>
  )
}
