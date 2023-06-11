import { useEffect, useMemo, useRef, useState } from 'react'
import { intervalToDuration, isBefore } from 'date-fns'
import type { Duration } from 'date-fns'

export function useCountdown(toDate: Date | number): Duration {
  // __STATE <React.Hooks>
  const intervalId = useRef<NodeJS.Timer>()
  const [currentDuration, setCurrentDuration] = useState<Duration>({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // __EFFECT's
  useEffect(() => {
    intervalId.current = setInterval(() => {
      if (isBefore(new Date(), toDate)) {
        const dura = intervalToDuration({
          start: new Date(),
          end: toDate
        })

        setCurrentDuration(dura)
      } else {
        clearInterval(intervalId.current)
      }
    }, 1e3)

    return () => {
      clearInterval(intervalId.current)
    }
  }, [toDate])

  // __RETURN
  return useMemo(() => currentDuration, [currentDuration])
}
