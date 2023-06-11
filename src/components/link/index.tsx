import { useRouter } from 'next/router'
import { useMemo, useCallback, ReactNode, MouseEvent } from 'react'
import cls from 'classnames'

interface Props {
  children: ReactNode
  className?: string
  activeClass?: string
  useLink?: boolean
  onClick?: () => void

  /**
   * Specifies the URL of the page the link goes to
   */
  to: string

  /**
   * Specifies where to open the linked document
   */
  target?: '_blank' | '_parent' | '_self' | '_top'

  /**
   * Specifies the relationship between the current document and the linked document
   */
  rel?:
    | 'alternate'
    | 'author'
    | 'bookmark'
    | 'external'
    | 'help'
    | 'license'
    | 'next'
    | 'nofollow'
    | 'noreferrer'
    | 'noopener'
    | 'prev'
    | 'search'
    | 'tag'

  /**
   * Specifies which referrer information to send with the link
   */
  referrerPolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
}

export function Link({ children, to, onClick, ...props }: Props) {
  // __STATE <React.Hooks>
  const router = useRouter()
  const className = useMemo(() => {
    const isActive = router.pathname === to
    return cls(props.className, 'router-link', {
      'router-link-active': isActive,
      [props.activeClass || '']: isActive
    })
  }, [router, to, props])

  // __FUNCTION's
  const handleRouterLink = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      router.push(to)

      if (onClick) onClick()
    },
    [to]
  )

  // __RENDER
  if (props.useLink) {
    return (
      <a className={className} href={to} target={props.target} rel={props.rel} referrerPolicy={props.referrerPolicy}>
        {children}
      </a>
    )
  } else {
    return (
      <a className={className} href={to} onClick={handleRouterLink}>
        {children}
      </a>
    )
  }
}
