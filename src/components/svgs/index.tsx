import { ReactNode } from 'react'
import cls from 'classnames'

interface Props {
  children: ReactNode
  className?: string
  fill?: string
  viewBox?: string
}

export function SVG({ children, className, fill = 'currentColor', viewBox = '0 0 16 16' }: Props) {
  // __RENDER
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill={fill} className={cls('icon', className)} viewBox={viewBox}>
      {children}
    </svg>
  )
}
