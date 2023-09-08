'use client'

import { useEffect, useRef } from 'react'
import { BusterDrone } from './render'

export function Three() {
  // __STATE<React.Hooks>
  const nodeRef = useRef<HTMLCanvasElement>(null)
  const started = useRef<number>(0)

  // __EFFECT's
  useEffect(() => {
    if (nodeRef.current && !started.current) {
      const three = new BusterDrone(nodeRef.current)
      three.init()

      started.current = 1
    }
  }, [nodeRef, started])

  // __RENDER
  return <canvas className='three-js mx-auto' ref={nodeRef}></canvas>
}
