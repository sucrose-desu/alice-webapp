'use client'

export function WaveComponent() {
  // __RENDER
  return (
    <video
      className='wave fixed bottom-0 w-screen mix-blend-screen brightness-50 transition-opacity delay-500 duration-1000'
      autoPlay
      playsInline
      muted
      loop
    >
      <source src='/static/media/ww-bg-wave.mp4' type='video/mp4' />
    </video>
  )
}
