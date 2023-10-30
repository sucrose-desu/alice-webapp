'use client'

import { useEffect } from 'react'

import { useGenre } from '@/hooks'

export function GenreComponent() {
  // __STATE<React.Hooks>
  const genres = useGenre()

  // __EFFECT's
  useEffect(() => {
    if (genres.list.length) {
      console.log(genres.list)
    }
  }, [genres])

  // __RENDER
  return (
    <ul className='-mb-2 block'>
      {genres.getAll(3, 34, 38, 46).map((genre, index) => (
        <li
          className='mb-2 mr-2 inline-block rounded bg-rose-800/10 px-2 py-1 text-xs font-medium capitalize italic text-rose-500'
          key={index}
        >
          {genre}
        </li>
      ))}
    </ul>
  )
}
