'use client'

import { useMemo, type ReactNode } from 'react'
import NextLink, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import cls from 'classnames'

type Props = LinkProps & {
  children: ReactNode
  className?: string
  activeClass?: string
}

export function Link({ children, className, activeClass, ...props }: Props) {
  // __STATE's
  const pathname = usePathname()
  const defClassName = useMemo(() => {
    const as = typeof props?.as === 'string' ? props.as : props.as?.pathname || null
    const href = typeof props.href === 'string' ? props.href : props.href?.pathname || null
    const isActive = as ? pathname.startsWith(as) : href ? href.includes(pathname) : false

    return cls(
      'router-link',
      {
        'router-link-active': isActive,
        [activeClass || '']: isActive
      },
      className
    )
  }, [pathname, className, activeClass, props])

  // __RENDER
  return (
    <NextLink className={defClassName} {...props}>
      {children}
    </NextLink>
  )
}
