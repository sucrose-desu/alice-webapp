import { useEffect, useMemo, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

export interface FuncReturn {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function useCountdown(toDate: Date | number): FuncReturn {
  // __STATE <React.Hooks>
  const [currentTime, setCurrentTime] = useState<number>(new Date().getTime())
  const secondsPerDay = 86400 // (60 * 60 * 24)
  const secondsPerHour = 3600 // (60 * 60)
  const secondsPerMinute = 60

  // __EFFECT's
  useEffect(() => {
    let intervalId: NodeJS.Timer

    intervalId = setInterval(() => {
      const now = new Date().getTime()
      setCurrentTime(now)
    }, 1e3)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // __RETURN
  return useMemo(() => {
    const diffInSeconds = differenceInSeconds(toDate, currentTime)

    if (diffInSeconds <= 1) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }

    const days = Math.floor(diffInSeconds / secondsPerDay)
    const hours = Math.floor((diffInSeconds - days * secondsPerDay) / secondsPerHour)
    const minutes = Math.floor((diffInSeconds - days * secondsPerDay - hours * secondsPerHour) / secondsPerMinute)
    const seconds = diffInSeconds - days * secondsPerDay - hours * secondsPerHour - minutes * secondsPerMinute

    return {
      days,
      hours,
      minutes,
      seconds
    }
  }, [currentTime])
}
