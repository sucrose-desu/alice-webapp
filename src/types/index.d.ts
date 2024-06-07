export interface IMedia {
  url: string
  isImage?: boolean
  isVideo?: boolean
  isAudio?: boolean
}

export interface CountdownDuration {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}
