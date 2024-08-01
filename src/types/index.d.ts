import type { ReactNode } from 'react'

export type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'

export type BaseProps = {
  children: ReactNode
}

export type IMedia = {
  url: string
  isImage?: boolean
  isVideo?: boolean
  isAudio?: boolean
}

export type CountdownDuration = {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}
