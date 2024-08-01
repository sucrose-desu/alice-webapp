import { Link } from '../link'
import { UserComponent } from './user'

export function NavbarComponent() {
  // __RENDER
  return (
    <nav className='ui--navigator z-100 fixed inset-x-4 bottom-4 flex justify-center'>
      <div className='ui--navigator-container grid grid-flow-col gap-2 rounded-lg p-2'>
        <div className='ui--navigator-main rounded-lg bg-black/40'>
          <button className='btn btn-home' type='button'>
            <span className='font-normal'>w. home</span>
            <span className='bi bi-list leading-none'></span>
          </button>
        </div>

        <div className='ui--navigator-menu rounded-lg bg-black/40 px-2'>
          <menu className='grid grid-flow-col gap-1'>
            <li className='li'>
              <Link href='/browse' key='.browse'>
                <span className='text'>browse</span>
              </Link>
            </li>

            <li className='li'>
              <Link href='/watch/0' as='/watch' key='.watch'>
                <span className='text'>watch</span>
              </Link>
            </li>

            <li className='li'>
              <Link href='/labs' key='.labs'>
                <span className='text'>labs</span>
              </Link>
            </li>
          </menu>
        </div>

        <UserComponent />
      </div>
    </nav>
  )
}
