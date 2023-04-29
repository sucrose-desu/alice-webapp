import { useEffect } from 'react'
import { useVideo } from 'react-use'

export function StreamComponent() {
  // __STATE <React.Hooks>
  const [video, state, controls, videoRef] = useVideo(
    <video controls src='/services/stream/eb1603bc-1771-45e5-af74-2884743f8cb0' controlsList='nodownload' />
  )

  // __EFFECT's
  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.pause()
  //     videoRef.current.setAttribute('src', '/services/stream/51b07d13-5e09-48f4-a1f5-938add90d4c0')
  //     videoRef.current.load()
  //     videoRef.current.play()
  //   }
  // }, [videoRef])

  // __RENDER
  return <div className='ui--labs-context'>{video}</div>
}
