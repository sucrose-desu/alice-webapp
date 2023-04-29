import { useRouter } from 'next/router'
import { useMemo } from 'react'

export function useQuery(name: string) {
  // __STATE <React.Hooks>
  const router = useRouter()

  // __RETURN
  return useMemo(() => {
    const param = router.query[name]

    if (param) {
      return param instanceof Array ? param[0] : param
    } else {
      return void 0
    }
  }, [router, name])
}
