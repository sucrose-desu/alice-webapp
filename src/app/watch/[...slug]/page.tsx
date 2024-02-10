// import '@/styles/pages/watch.scss'

import { useMemo } from 'react'

type Props = {
  params: { slug: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function WatchContainer({ params }: Props) {
  // __STATE<React.Hooks>
  const [album, track, ep] = useMemo(() => params.slug, [params])

  console.log({ album, track, ep })

  // __RENDER
  return (
    <div className='ui--watch-container'>
      <p className='italic'>.ui--watch-container</p>

      <ul>
        <li>{album}</li>
        <li>{track}</li>
        <li>{ep}</li>
      </ul>
    </div>
  )
}
