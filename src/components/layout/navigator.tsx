import Link from 'next/link'

import { UserComponent } from './user'
import { SVG } from '../svg'

export function NavigatorComponent() {
  // __RENDER
  return (
    <nav className='ui--navigator fixed inset-x-4 bottom-4 z-10 flex justify-center'>
      <div className='ui--navigator-container grid grid-flow-col gap-2 rounded-lg border border-solid border-neutral-900 bg-neutral-900/80 p-2'>
        <div className='ui--navigator-main rounded-lg bg-black/40'>
          <button className='btn btn-home'>
            <span className='text font-normal'>w. home</span>
            <SVG className='bi-list aspect-square w-[18px] cursor-pointer' key='list'>
              <path d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z' />
            </SVG>
          </button>
        </div>

        <div className='ui--navigator-menu rounded-lg bg-black/40 px-2'>
          <ul className='ul grid grid-flow-col gap-1'>
            <li className='li'>
              <Link className='router-link' href='/browse' key='.browse'>
                <span className='text'>browse</span>
              </Link>
            </li>

            <li className='li'>
              <Link className='router-link' href='/watch/0' key='.watch'>
                <span className='text'>watch</span>
              </Link>
            </li>

            <li className='li'>
              <Link className='router-link' href='/labs' key='.labs'>
                <span className='text'>labs</span>
              </Link>
            </li>
          </ul>
        </div>

        <UserComponent />
      </div>
    </nav>
  )
}
