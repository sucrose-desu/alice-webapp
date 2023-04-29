import { useRouter } from 'next/router'
import { AuthService } from '@/services'

export default function UserContainer() {
  // __STATE <React.Hooks>
  const router = useRouter()

  // __RENDER
  return (
    <div className='ui--user-container'>
      <a onClick={() => AuthService.logout(() => router.push('/browse'))}>logout</a>
    </div>
  )
}
