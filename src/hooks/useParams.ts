import { useRouter } from 'next/router'
import { useMemo } from 'react'

export function useParams<T = any>(name: string, type?: Function): T {
  // __STATE <React.Hooks>
  const router = useRouter()

  // __RETURN
  return useMemo(() => {
    const param = router.query[name]

    if (param) {
      let value = param instanceof Array ? param[0] : param
      return type ? type(value) : value
    } else {
      return void 0
    }
  }, [router, name, type])
}
