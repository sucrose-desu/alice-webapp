import { isBrowser } from '@/constants/configs'
import '@/styles/pages/browse.scss'

export default function BrowseContainer() {
  console.log('isBrowser', isBrowser)

  // __RENDER
  return <div className='ui--browse-container'>.ui--browse-container</div>
}
