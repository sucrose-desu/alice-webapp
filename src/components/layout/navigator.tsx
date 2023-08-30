import Link from 'next/link'

import { SVG } from '../svgs'
import { UserComponent } from './user'

export function NavigatorComponent() {
  // __RENDER
  return (
    <nav className='ui--navigator'>
      <div className='ui--navigator-container'>
        <div className='ui--navigator-main'>
          <button className='btn btn-home'>
            <span className='text'>w. home</span>
            <SVG className='bi-list' key='list'>
              <path d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z' />
            </SVG>
          </button>
        </div>

        <div className='ui--navigator-menu'>
          <ul className='ul'>
            <li className='li'>
              <Link className='router-link' href='/browse' key='.browse'>
                <span className='text'>browse</span>
              </Link>
            </li>

            <li className='li'>
              <Link className='router-link' href='/watch' key='.watch'>
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
